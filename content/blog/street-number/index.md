---
title: "Identify Street Numbers in Realistic Environments"
date: "2023-04-26"
coverImage: "./guide_dog.png"
category: ["machine learning"]
---

# Introduction

In order to alleviate the hardships of people with vision loss when navigating through a city, the Humanware project aims to create an application to identify text and numbers in real time using the camera of a phone. In the previous two blocks, the open source dataset that was used provides a ground truth bounding box of the address number, therefore previous blocks always have access to the digit’s location. However, in order to adapt the application for deployment, we need to consider that street numbers are embedded on many different backgrounds, and the extraction of digit location must be done before digit classification.

For the third block of the project, we tried to automate the generation of boundary boxes around a zone of interest containing address numbers. To obtain the bounding boxes, we compared two image segmentation models using the implementation of _Faster RCNN_ [7] algorithms found in the _Facebook_ repository[4]. To evaluate the usability of our models as bounding box generators, we used an existing digit recognition model (ResNet [2] from Bounding Box) and compared its accuracy when using the true boxes and our predicted boxes.

Our final model is an end-to-end task that uses Faster-RCNN to find the bounding box of an address in an image and feeds it to a ResNet model from Bounding Box for digit recognition. More details about the previous model are given in Section 3.3. We obtained a mean Average Precision of 89.6% with Faster-RCNN, 70.0% validation accuracy on Bounding Box ResNet [2] model using ground-truth boxes, and 70.3% validation accuracy when combining the generated bounding boxes to the ResNet model.

The following report is split as follows. Section 2 presents the previous and current datasets and their format. Section 3 includes the methodology and describes the used algorithms and their hyperparameters for detection and sequence recognition. Section 4 presents the final results we obtained with each model and an analysis comparing them to each other and previous results. Section 5 explores new approaches that could enhance the results of our models.

# Dataset

In this section, we briefly introduce the SVHN dataset used by Bounding Box and present the synthetic dataset we use in this block.

## Street View House Numbers Dataset (SVHN)

The SVHN [5] Dataset contains over 600k images of house numbers obtained from Google Street View. Each image is cropped to focus on the house numbers and individual bounding boxes are given for each digit. This dataset is limited by the lack of negative examples (e.g. no digits present, blocked digits) and lack of background (images are too zoomed in).

## Element AI Synthetic dataset

We aim to improve the robustness of Bounding Box models with the synthetic dataset and eliminate the limitations of SVHN. The dataset we used to train the segmentation task is composed of 6000 synthetic images containing a rendering of houses and a house number. The dataset is split in a 5:1 _train to validation_ ratio and contains different angles and viewpoints that are not present in SVHN, allowing for a better representation of real-world applications. However, this dataset has new flaws that were not seen in SVHN:

- The renders are not photorealistic.
- The dataset is orders of magnitude smaller than SVHN
- There are only a few different house models.
- The house numbers are only three or four digit long.
- There is only one font used for the house numbers.
- Some digits are hidden by objects (_Figure 1a_) and are impossible to classify.
- Some images contain cropped digits (_Figure 1b_) or no address at all (_Figure 1c_) and are impossible to classify.

These limitations will affect our models if they were to be used on real world images and the accuracy should drop. However, the dataset is adequate for a proof of concept before translating and adapting the work to real data.

# Algorithms and Methodology

In Bounding Box modoeling, the goal was to predict the length of each sequence as well as transcribing digits correctly while the ground truth bounding boxes of address numbers were provided. In the third block, the bounding boxes are not provided, so our first task is to generate the 2 bounding boxes by an object detection model and then send the generated boxes to the sequence digit recognition model in Bounding Box.

Object detection is the process of finding and classifying different objects in an image. To do this, we use the architecture named Faster RCNN described in Subsection 3.2.

After obtaining the location of the digit sequence, Bounding Box model is used to classify digit sequences in the sub-region of an original image cropped with bounding boxes. Figure 2 shows the architecture of combining two models . We have described the Bounding Box (ResNet) model in the subsection following Faster-RCNN.

## Data Preparation

In Bounding Box, since true bounding boxes are given, data preprocessing primarily involves using PyTorch’s transform library to add small perturbations on the fly. The Bounding Box methods include random cropping and border padding. In Block 3, however, the whole Faster-RCNN is essentially a data preprocessing step that produces the bounding box predictions. After obtaining the bounding box predictions, we apply the same random cropping and padding to segmented images. Bounding Box has demonstrated that random cropping reduces overfitting, while border padding helps with convolutions where digits get cut off by bounding boxes.

## Faster RCNN overview

In Block 3, we are instructed to use Faster RCNN and adapt it to our data set. The goal of using Faster RCNN is to identify the digit patch inside a larger image with other background objects.

Faster RCNN couples a stable convolutional neural network (CNN) model, such as ResNet [7], and the Regional of Interest (ROI) Proposal Net (RPN) to achieve efficient and accurate results in object detection. Figure 3 demonstrates how we adapt Faster-RCNN for ElementAI dataset. The code is implemented in Pytorch by Facebook AI developers and the teaching staff has kindly recommended a stable build for us to use out-of-the-box with Element AI dataset. Faster-RCNN is built on top of C++ backend and due to constraints on the Calcul Quebec cluster, we only retrain the model’s output layers and modify the dataloader for this specific ElementAI dataset. For this project, we tried two different Faster RCNN architectures: R-50-FPN and R-101-FPN.

The metric used to compare our bounding boxes to the given boxes for each image is the IoU, or Intersection over Union. This metric first takes the ratio between the area contained in both boxes and the area contained in either box. This ratio is then compared to a threshold between 0 and 1. If the IoU is over the threshold, the predicted box is considered a correct box. The metric used to evaluate the Faster-RCNN models is the mean Average Precision (mAP)[4]. The mAP is the average of the precision values for IoU thresholds from 0.5 to 0.95 (with a step of 0.05).

_IoU_ =area of overlap / area of union

$mAP = \frac{1}{10}\sum_{j=1}^{10}AP(IoU = 0.45+0.05 \times j)$

## Bounding Box Model

ResNet is a type of convolutional neural network with skipping layer residual connections that has proven to excel in ImageNet competitions and other various computer vision tasks [2]. ResNet34 and ResNet50 are two varations of the architecture, where 34 and 50 indicate the number of residual connections respectively. In order to prevent overfitting, we apply early stopping during training with patience ranging from 20 to 1/3 of total epochs (refer to Section 3.3 for details).

The bounding box model (see Figure 4) implements feature extraction with ResNet, and after feature extraction, we would obtain a fixed length vector. Then, in order to predict both digit sequence length and digit classification, Bounding Box implements multi-task learning, which connects the feature vector to 6 different branches, where each branch contains a fully connected (FC) layer. Branch 1 is used to predict the sequence length, and the other 5 branches predict the content in each position of the sequence. If we obtain a sequence length less than 5, we simply truncate the final output [1]. This truncation approach ensures that we can apply the same model for sequences with varying lengths.

## Faster RCNN and Bounding Box model pipeline

The last and the main part of this block is to make an end-to-end pipeline between the trained model in Bounding Box and Faster-RCNN model. We train Faster-RCNN model and Bounding Box models independently. For evaluation part, we input full sized images to Faster-RCNN model and obtain the predicted bounding boxes. Then, using a dataloader consists of data transformation such as cropping and down scaling (see previous Section 3.1), we preprocess bounding box segmented test data further, and then use Bounding Box ResNet model to identify and predict digits. The pipeline is illustrated in Figure 2.

As pointed out by teaching staff, the pipeline is more software-engineering centric rather than a machine learning problem. The pipeline itself does not have any parameter or hyperparamter, and therefore all discussions and results are empirical.

## Hyperparameter optimization

Tables 1 and 2 contain the value of hyperparameters we used.

1. For Faster-RCNN model, we used the default hyperparameters as instructed by the teaching staff. Instead of exploring a range of hyperparameter search space, we simply pick the values from a given set shown below. The **{}** symbol indicates a set.

2. For hyperparameter tuning of Bounding Box ResNet model, we used Bayesian Optimization in Scikit-learn. We tuned the learning rate, momentum, and decay parameters for SGD, and only the initial learning rate for Adam since it implements auto-correcting of the rest of its parameters. Table 1 indicates the range of hyperparameter space we choose.

3. The final pipeline is using bash script to connect the output of Faster-RCNN to Bounding Box ResNet. As explained in Section 3.4, no hyperparameters are shown.

Table 1: Hyperparameters for Bounding Box model

| Hyperparameter     | Range                 |
| ------------------ | --------------------- |
| Learning Rate (LR) | [0.0001,0.01]         |
| Momentum           | [0.90,0.91]           |
| Weight Decay       | [0.0001, 0.001]       |
| Decay steps        | [10000, 10001]        |
| Decay Rate         | [0.89, 0.90]          |
| Features-O-size    | [3000,6000]           |
| Batch size         | 32                    |
| Epochs             | [50, 400]             |
| Patience           | [20, 1/3 total epoch] |
| LR milestones      | [20, 40, 80]          |
| LR Gamma           | 0.1                   |

Table 2: Hyperparameters for Faster RCNN

| Hyperparameter         | Range               |
| ---------------------- | ------------------- |
| Base Learning Rate(LR) | {0.0025, 0.002}     |
| Weight Decay           | 0.0001              |
| Steps                  | (2400, 3200)        |
| Batch size-train       | 2                   |
| Batch size-test        | 1                   |
| Max-Iterations         | {3600, 7200, 14400} |

# Results and Analysis

This section presents our results obtained we the different models we trained.

**4.1** **Faster RCNN Bounding Box Segmentation results**

The results of the best object detection models are presented in table 3. The different values for the mAP are presented in table 3. We notice that the R-101-FPN model has a higher mAP score than the R-50-FPN model.

Table 3: The mean Average Precision (mAP) when using the validation dataset for the two Faster RCNN models we trained for 14400 iterations.

| Model     | mAP   |
| --------- | ----- |
| R-50-FPN  | 86.7% |
| R-101-FPN | 89.6% |

We notice that the training loss for R-101-FPN is generally slightly lower than the loss for R-50-FPN. Both these losses reach a plateau around 0.01 after 10000 iterations, as shown in figure 5.

**Original Block 2 model vs modified Block 2 model**

The experimented models in Block2 are VGG19, ResNet18, ResNet34, Resnet50, and we decided to compare ResNet34 and ResNet50 in our project because Block 2 team concludes that they are the best performing models. The model architectures remain the same, while the input is altered larger/deeper models have higher capacity that works well with SVHN (over 600, 000 digit images), but less suitable with the setup of Bounding Box models.

Attempted transfer learning

We attempted loading checkpoint weights as an initialization. The results show no significant improvement, largely due to particularities of the ElementAI dataset described in Section 2.

**Faster RCNN and Block 2 Pipeline Results: Impacts of Bounding Box**

The sequence transcription accuracy is expected to drop when using predicted bounding box from Faster-RCNN versus using ground truth bounding box for Block 2 ResNet. After inspecting the vali-dation accuracy, the difference is merely 0.3%, therefore the pipeline does not hinder the performance significantly.

# Conclusion and further directions

In previous block the task was to predict the sequence of digits on the SVHN [5] dataset. In this block the task is to segment the images in the Element AI dataset and predict house number sequences. To solve this task, we first apply an object detection model (Faster-RCCN) [7] to obtain the bounding boxes. These bounding boxes are then used as inputs for the classification model (ResNet34 [2]) to predict the house number.

Our model has 70.3% accuracy on Element AI validation set. We experiment with two versions of Faster-RCNN [7] and the one with R-101-FPN outperforms the one with R-50-FPN. We also observe that ResNet34 [2] works better than ResNet50 [2] for the sequence prediction task.

We notice that the performance of same architecture on ElementAI dataset drops by 20% compared to performance on SVHN. The presence of negative samples and background noise in ElementAI dataset contributes to the drop. If granted another dataset with similar variety, such as angle, noise, and background, this model could serve as a baseline. Apart from performance issues, we also noticed that the whole model takes a lot of time to make predictions.

To increase performance and robustness of our model, semi-supervised representation learning techniques such as the ones proposed by Salimans et al. [8] can be used. To reduce the prediction time, real-time models such as YOLO [6] and SSD [3] can be used.

# Authors (alphabetical order)

- Saber Benchalel
- Violet Guo
- Marzieh Mehdlzadeh
- Ishaan Kumar

Citations and figures are available upon request.
