---
title: "Fact or Fake News: Applying NLP in an unbalanced dataset"
date: "2024-05-01"
coverImage: "./mrbean.jpg"
category: ["machine learning"]
---

# Author's Note

I wanted to reflect on this past project. My team decided to join an existing machine learning competition where the source data and a base line model was provided to us. The following is an excerpt from an original report written by Étienne Girard-Proulx, Violet Guo, and Matthew Lesko-Krleza (in alphabetical order). I have omitted the citations and some diagrams, but they are available upon request.

# Introduction

For better or for worse, social media has had a significant impact on content and information distribution.
Since anyone has the ability to post anything at anytime, there comes the cost of an increase in the spread of fake news articles and claims.
Detecting whether an article is promoting fake news or not is difficult since the claim's goal is often to mislead readers to some false conclusion.
Therefore, being able to fact check claims by analyzing relevant articles can be beneficial as it would allow systems to promote true and relevant news.
Ideally, this would reduce public exposure to fake news and deter its spread.
In this project, we examine this challenge and evaluate how natural language processing (NLP) models can be used for the task of fake news classification.
Our goal is to train a variety of linear, ensemble, and neural network models and use pre-processing techniques that we've seen in class to achieve high classification accuracy.
By training and evaluating models on a news dataset provided by the 2019 online competition `Leaders Prize: Fact or Fake News', we demonstrate several NLP models' effectiveness at classifying false, partly true, and true news.
We show that our methods can successfully detect fake news but would require more work in true news identification.

# Data Description

The source of our labelled dataset is from the 2019 online competition called `Leaders Prize: Fact or Fake News?' \cite{DataCup}.
The competition involves the task of classifying news claim within its provided dataset as either: False, Partly True, or True.
The dataset is comprised of labelled claims (i.e. statements), claimants, and related article content. Claimants are related to claims, however not all claims have a claimant.
The data contains a total of 15,555 claims, and 64,974 related articles.
Therefore, there is a total of 15,555 examples to train and evaluate our models with.
The competition has a hidden test set that can only be evaluated on when making a submission.
We did not make use of this test set because the competition submission closed before we had the chance to make any.

## Data Imbalance

Upon further analysis of our data, we noticed a severe class imbalance as illustrated in Figure \ref{fig:label-hist}.
The majority of our data is of False and Partly True claims.
More precisely our examples are labelled: 48% False, 41% Partly True and 11% True.
We believe if this imbalance is not addressed, we expect to see a significantly low recall within our results.
We discuss a method to circumvent this imbalance in Section 4.7.

# 4 Methodology

Here we explain the different pre-processing techniques, feature extraction methods and models that we used and evaluated.
For this project, we are using the Python 3 programming language and several external Python packages: Pandas, SciPy, Matplotlib, Tqdm, Scikit-Learn, Tensorflow, Keras, PyTorch and XGBoost.

## 4.1 Data Split

Since the competition's test set is hidden from us, we made use of splitting the training data that was provided.
The split is a ratio of 70\%, 15\% and 15\% for the training, development and test sets respectively.

## 4.2 Data Pre-processing

Next we describe the techniques we've used for pre-processing our data. The methods used are the following: square bracket removal, non-ASCII character removal, punctuation removal, character lowercasing, numerical character replacement, stemming and lemmatization.

These techniques are applied on claims and related article content. The majority of claimants are proper nouns, so we didn't apply pre-processing on claimants. We applied non-ASCII character removal to clean our corpus from unordinary characters. Character lowercasing is applied because we don't want our models to differentiate between words of the same spelling but different capitalization. Stemming and lemmatization are both performed to make our feature space dimensionally lower, with the intent of making our models faster to train and more generalizable.

## 4.3 Training and Evaluation

We tuned our models using the training and development sets to determine optimal hyperparameter configurations.
Then we trained the optimally parameterized model on the training and validation sets, and finally evaluated it on the held-out test set.
By doing so, we can empirically determine optimal hyperparameter configurations by detecting overfitting and use the test set to have an unbias evaluation of our models.

## 4.4 Most Frequent Label Classifier Baseline

For comparison purposes, we have tested a Most Frequent Label Classifier baseline.
Given a set of test examples, the predictor classifies each example to that of the most frequently occurring label.
This was implemented using SciKit-Learn's DummyClassifier application programming interface (API) .
This is not meant to be used as an effective predictor, yet a critical baseline for an unbalanced dataset.

## 4.5 Linear Model Baselines

We trained and evaluated three linear models as baselines to compare with more complex models that we eventually train and evaluate.

We trained and evaluated three different multi-class linear models: Logistic Regression, Support Vector Machine (SVM) and Naive Bayes.
Logistic Regression and SVM are discriminative models whereas Naive Bayes is a generative model.
Generative models estimate the joint distribution of features and labels whereas discriminative models estimate the posterior probability of some label given its features.
The difference between Logistic Regression and SVM is the different objective functions used at training.
They both estimate an hyperplane that can separate the training labels' categories.
The subtle difference is that SVMs attempt to maximize the margin (i.e. distance) between its estimated hyperplane and the observations from each class \cite{svm} whereas Logistic Regression performs Maximum Likelihood Estimation (MLE) to maximize the likelihood that a random point gets classified correctly.
The models are trained on Term Frequency-Inverse Document Frequency (TF-IDF) representations of the concatenation of the claim, claimant, and related article content.

We fine tuned each linear models' parameters with Grid Cross Validation of Fold 3.
The model configurations, validation F1 scores, and test F1 scores are available within Table \ref{table:fine-tune-grid-cv}.
We trained, fine-tuned and evaluated these models using SciKit-Learn's relevant predictor, Grid Cross Validation and metric APIs.

## 4.6 Ensemble Models: Random Forest and Extreme Gradient Boosting (XGBoost)

Ensemble models are popularly used in these sorts of classification challenges and are often considered the state-of-the-art solution.

The main premise is that by combining multiple models, the errors of a single base-learner will likely be compensated by other base-learners, as a result the overall prediction performance would be better than that of a single model.

A Random Forest is decision-tree-based ensemble model.
There are two main components to this ensemble.
The first is that each tree is trained on a random sample from the training data.
The second is that a random subset of features are selected to generate a split for each node in a tree.

Similarly to a Random Forest, XGBoost is a decision-tree-based ensemble model, however it uses a gradient boosting framework.
XGBoost trains an ensemble of base-learners and boosts weak learners using gradient descent.
It also uses some system optimizations and algorithmic enhancements to make it faster to train compared to its sister model: Gradient Boosting Machine (GBM).

Similarly to the linear models, we fine tuned the ensemble models using a Grid Cross Validation of Fold 3.
Their results are available within Table 3. The models are trained on TF-IDF representations of the concatenation of the claim, claimant, and related article content.
We used SciKit-Learn's and XGBoost's relevant predictor APIs.

## 4.7 Fully Connected MLP Neural Network Baseline

We re-implement the simple fully connected neural network, or multi-layer perceptron (MLP) using PyTorch, in order to verify whether their method would transfer to our fake news dataset.

The input layer samples from our customized PyTorch `Dataset` class, which concatenates a 5,000 dimensional TF vector from claim, and another 5,000 dimensional TF vector from related texts, and a cosine similarity score of the TF-IDF vectors of the two, according to \texAtcite{DBLP:journals/corr/RiedelSR17}'s hyperparameters. The paper's architecture only yields around 35% validation accuracy.

Upon examining the TF and TF-IDF vectors, only around 500 to 1,000 are non-zero. We then decide to limit the dimensions to 500 in the TF and TF-IDF functions. Then, we apply principal component analysis (PCA) to the 500 dimensional TF vectors, and obtain 64 principle components from claim and text.

In order to address the data imbalance problem, we further modify a plain PyTorch `Dataset` using a `WeightedRandomSampler`. This ensures that each batch samples the rare class with a higher probability, and each batch contains approximately equal number of samples from each class.

We also experiment with various loss metrics utilized by computer vision experiments in handling data imbalance, such as dice loss \cite{Wong_2018} and focal loss \cite{lin2017focal}. However, the metrics that are suitable for vision tasks do not transfer to NLP applications. Binary cross entropy loss is the best out of all metrics we tried. Weighted batch sampling and binary cross entropy loss improve our validation set unweighted F1 score from 35% to 45%.

## 4.7 Sequential Neural Network Model: Bidirectional Long Short-Term Memory (Bi-LSTM)

The final model we test is a custom neural network model inspired from the Bi-LSTM architecture.
The idea behind this model is to leverage simpler model for metadata features and use more complex model such as LSTM to extract relevant information from more complex features like claim and related articles.

Metadata features such as the claimant, the number of articles supporting the claim are features already in a format that can be passed to the model and are passed directly to the model via a standard MLP. For the claim and related articles, we first preprocess the text like described in section data-preprocessing, then convert the preprocessed text to a fixed length vector using the text to sequence and padding implementations of Keras.
Then, we pass both the claim resulting vector and the related article resulting vector to two embedding layers. The goal of using embedding layers is convert sparse vector to dense vector. Finally, we concatenate the two dense vectors and pass the resulting concatenated vector to a bi-lstm model.
To obtain a final prediction, we concatenate the output of the bi-lstm and of the MLP and pass everything through a softmax layer. Model architecture is available upon request.

We expect that this model, if trained properly, should be the most performing one due to the sequential nature of the model. To train the model, we used the Nadam optimizer. This optimizer is a mix between two well known optimizers: Nesterov and Adam.

# Results

To evaluate our models' performance, we are concerned with Weighted Average F1 and Recall for the `True' class. We are particularly interested by the Recall of the True category since it tells us how much of the truthful news our system was able to detect within the dataset.
If some system like this were to be deployed, we would want it to be able to detect 'True' news from 'False' ones with a high success rate.  
We would not simply censor all news because it was incorrectly deemed as 'False.'
A more detailed look at precision, recall and F1 scores are available in the results table.
It is also the measure that highlights a lack of performance in handling an unbalanced dataset.

Next, we compare our different methods and discuss potential reasons behind their performance.

| Model                    | Weighted Average F1 score (%) | Recall of True Class (%) |
| ------------------------ | ----------------------------- | ------------------------ |
| Most Frequent Classifier | 31.0                          | 0.0                      |
| Logistic Regression      | 58.0                          | 1.0                      |
| Linear SVM               | 57.0                          | 0.0                      |
| Naive Bayes              | 53.0                          | 0.0                      |
| Random Forest            | 60.0                          | 2.0                      |
| XGBoost                  | 56.0                          | 1.0                      |
| MLP                      | 40.1                          | 17.0                     |
| Bi-LSTM Custom           | 60.0                          | 0.0                      |
| Bi-LSTM Rebalanced       | 57.0                          | 5.0                      |

# Author's Reflection

This project was graded by 2 TAs and our professor. They had very different interpretations of this project.
I want to pause here and jot down some of my own reflections.

## Writing

In my opinion, we spent too much time explaining how the various machine learning models work. The explanations should be reduced by 30%.

## Lack of NLP domain expertise

The project should spend more time in the data preprocessing and exploration stage. For NLP, there are many old-school NLP algorithms that would extract word level, sentence leve, paragraph level, and corpus level features.

The data contained the news article, as well as the source. It is highly likely that the source itself is a more influential indicator of the reliability of the claim.

## Attempted too many ML models

For someone with more computational linguistics backgorund, this project could sound like a bookkeeping record of different machine learning models we tried. Some models, such as Bi-LSTM Rebalanced, does not provide much more advantage over other methods we have tried. More isn't always better.
