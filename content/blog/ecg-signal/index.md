---
title: "Predicting ECG Signal from Unlabelled Data"
date: "2023-09-26"
coverImage: "./math.jpg"
category: ["machine learning"]
---

# Introduction

The following project is a classic example on why complicated and novel methods aren't always the best.

> OMsignal is a company specializing in analytics on electrocardiogram (ECG) signals. The project requires using raw ECG signal to predict the mean PR interval, the mean RT interval, the standard deviation of the RR interval, and to identify the user. This multitask problem was approached as a supervised learning problem in block 1, using only labeled data. Results show that convolutional neural networks performed better than regular multilayers perceptrons or even recurrent neural networks. Block 2 shifts the focus from supervised to semi-supervised learning, with the addition of around 600k unlabeled samples. While the multitask objective remains essentially the same, the new samples contain precious information relative to the representation of the data. The purpose of this block is to extract this information from the unlabeled samples in order to improve the training of predictive models and increase their performances on the test set.

# Methodology

> In block 1, data preprocessing such as normalization and noise removal were tried. In addition to data preprocessing, data augmentation such as negation of signal sections, temporal shift of the signal and partial noise addition were also tried. We decided to keep these because block 1 reports show significant improvement of the performances while using those methods. In addition to this, we converted the data into frequency space domain using Fast Fourier Transforms (FFT) to use as an additional/alternative input. Data loading functions from block 1 were adapted in order to process unlabeled samples.

## Unsupervised Pretraining

> As a form of unsupervised pre-training, we implemented an autoencoder model that learns a latent representation of the data. Autoencoders contain an encoder and decoder. Encoders learn an intermediate representation of the dataset through dimensionality reduction, while decoders try to reconstruct the input with minimal error. Where classification models tend to overfit on small labeled datasets, studies show that autoencoders can increase generalization and stability (\cite{DBLP:journals/corr/abs-1807-11407}). We used an autoencoder to learn a latent representation of the unlabeled data which is then passed to a prediction module.

> The first model we have tried with that approach was to use an autoencoder with a single hidden layer neural network for both the encoder and the decoder. For the prediction module, we used the same CNN that was used as the baseline model for the block 1. Hence, the prediction module is a multi-layer CNN with batch-normalization for 1D inputs. Its also a multi-task network that can be trained on any combination of targets.

## Semi-supervised Training: Class 1 model

> In class 1 models, a branch is added to the network to handle the unlabeled data. Similarily to the unsupervised pretraining approach, encoders try to learn a low-dimensional representation that helps generalization and reduce overfitting. The major difference is that, instead of first training the autoencoder and then the prediction module, in this approach we train the two simultaneously by feeding a mix of labeled and unlabeled data. This allows the training of the low-dimensional representation to be not only driven by the unlabeled data. The basic architecture of a class 1 model is shown in Figure \ref{class 1 architecture}

### Vanilla Class 1 Semi-Supervised Model

> As our first class 1 model, we trained the same multi-layer CNN as before, but we added a branch reconstructing the input when the sample fed is unlabeled. Our encoder here uses the convolutional layers of the CNN, and depending on if the data is labeled or not, the processed sample is passed either to a two-hidden-layer MLP that gives a prediction or to a decoder that reconstructs the input. In both cases, this is followed by back-propagation to update the weights.
> We've attempted this with two types of decoder. First, we tried an MLP. We decided to test MLP both to stay closer to the prediction module architecture (also an MLP), and to make sure the hidden representation of our inputs works well with MLP. Second, we built a convolutional autoencoder. Here, the encoder consists of convolutional layers and the decoder of deconvolutional layers. The decoder reconstructs the input with transpose convolution operations. The decoder architecture mirrors the encoder, replacing each `nn.Conv1d` with `nn.TransposeConv1d` and `nn.Maxpool1d` with `nn.MaxUnpool1d`. The architecture of the convolutional autoencoder is shown in figure \ref{conv-ae-arch} of the annex.

### Ladder Network

> The ladder network is a semi-supervised algorithm that couples supervised loss and unsupervised loss to train both the encoder and decoder. The term ladder refers to this coupling mechanism. The ladder network follows a conventional autoencoder principle, except for the following changes:

> - Adds a Gaussian noise to the inputs for decoders. Forces the decoder to learn to reconstruct the output from a noisy input.
> - Weighs each decoder layer's reconstruction error. Usually the deeper encoders are weighted higher because they are closer to the final output prediction layer.
> - For the gradient path, it combines both classification layer's cross entropy loss and each decoder layer's reconstruction loss to back propagate. Ideally, through this combination scheme, a single optimizer should be able to find the optimal weights for both tasks.

> However, one major downside of the ladder network in this specific project is that it has not been proven to work on regression tasks. Neither the original paper (\cite{DBLP:journals/corr/RasmusVHBR15}) nor others (\cite{DBLP:journals/corr/PezeshkiFBCB15}) present any experiment on regression tasks. This limits the network's scope to the user_id classification only.

### Semi-supervised Training: Class 2 model

> The "Mean Teacher" model, developed by the Curious AI Company [\cite{DBLP:journals/corr/TarvainenV17}], is a consistency regularization method. This semi-supervised training method consists of using two instances of an architecture: the Student model and the Teacher model. Training through gradient descent is only performed on the Student model. The parameters for the Teacher model are obtained via an exponential moving average (EMA) of the actual and previous weights and biases of the Student model. During training, the sample fed to the models is noised differently in order to create a slightly different version of it for each model. We used all data pre-processing and augmentation methods described in section 2.1. Both the Student and Teacher models make predictions for these samples. The final loss function combines two terms: a classification cost between the Student model prediction and the actual label of the sample (if the sample originally has a label) and a consistency cost between the Student and Teacher model prediction (for both labeled and unlabeled). The structure is described in Figure \ref{mean_teacher_struc} in Appendix. For Student and Teacher model we opted for a 2-layer convolutionnal neural network using max pooling and dropout, based on the performances from previous block teams. Further details about the architecture can be found in the repository.

> We decided to implement this model because of the promising results it shown in semi-supervised learning and its novelty. The measure of its performance can be found in the orignal paper by Tarvainen. The EMA weight sharing between the Student and the Teacher model allow a transfer of information that gives the Teacher a better intermediate representation of the sample, and it has been shown that averaging model weights over training steps can produce more accurate results than using final weights directly (Polyak et al.[1992]). Source code for this model was taken from Curious AI's Github repository (\url{https://github.com/CuriousAI/mean-teacher}). The code can be found in the legacy folder of our project. All modified files and functions were copied into our project first in order to keep the legacy files intact.

# Model Results

| Model                    | Overall score | prMeanTau | rtMeanTau | rrStdDevTau | userIdAcc |
| ------------------------ | ------------- | --------- | --------- | ----------- | --------- |
| Baseline Block1          | 0.403         | 0.591     | 0.761     | 0.328       | 0.181     |
| Unsupervised Pretraining | 0.000         | 0.000     | 0.219     | 0.079       | 0.012     |
| Class 1 MLP autodencoder | 0.410         | 0.658     | 0.766     | 0.321       | 0.174     |
| Mean teacher             | 0.228         | 0.23      | 0.26      | 0.25        | 0.18      |
| Ladder Network           | NA            | NA        | NA        | NA          | 0.05      |
| Class 1 CONVae           | NA            | NA        | NA        | NA          | 0.131     |

# Reflection

Every team that tried deep learning models got similar results, with the user prediction accuracy around 20%. Only one team was able to obtain nearly 98% accuracy. They did so with a simple model inspired by a medical journal, involving handcrafted features from medical researchers who specialized in ECG signals. Obviously, the feature based model was also much faster to train compared to neural network based models.

This is a classic example where deep learning is not always superior. As machine learning engineers working in industry, it is extremely important to take domain expertise and constraints into consideration.

The quotes are excerpts from an original report written by Étienne Girard-Proulx, Violet Guo, and Jean-Philippe Letendre (in alphabetical order).
