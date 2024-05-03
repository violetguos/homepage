---
title: "Writing Good Code vs Training More Models"
date: "2024-05-02"
coverImage: "./tree.jpg"
category: ["machine learning"]
---

# Writing Good Code vs Training More Models

In this project, we had relatively poor model performance. I would like to do a little introspection below.

# Original Project Report Introduction

In many real world settings, having access to a rich labelled data set is challenging. There are several situations in which one has a large corpus of unlabelled data, and a relatively small amount of labelled data, which is often laboriously obtained by manual effort. In order to build scalable machine learning systems, the task of labelling data should be automated. This problem broadly falls under the category of unsupervised or semi-supervised learning.

In this project, there is a large store of unlabelled images of forest canopies, and a small set of labelled data. The labels indicate the 'species', 'density' and 'height' of the tree. The goal is to predict the species, height, and density from aerial images of forest canopies. Labelling this data set is performed by manual intervention, which proves to be expensive and time consuming. Therefore, the goal is to build an automated system to label the large corpus of unlabelled data using labelled and unlabelled data.

We aim to build a baseline algorithm to perform this task. Baselines are an often ignored and critical part of a machine learning project; they provide a reference point to compare the performance of more sophisticated models. We use the k-means algorithm to cluster the large corpus of training data, and assign labels to these learned centroids by dividing the labelled data set into non overlapping sets. The high dimensional nature of the data (4096 dimensions per data point) makes this problem challenging. **Therefore, as a pre-processing step, we use PCA (Principal Component Analysis), a dimensionality reduction algorithm, to reduce the redundancy in our data set and get better results using the above mentioned methods.**

We obtain a 45.8% validation accuracy with our best model.

# Analysis

In the bolded text from the original project report, you can tell that we did not try a variety of dimensionality reduection algorithms or explore other classic computer vision methods without machine learning.

We ended up spending a lot of time refactoring our project code base. This was the project's Github structure

```
.
├── data
│   └── synthetic
├── evaluation
├── models
│   ├── horoma_classifier
│   ├── k_means
│   ├── most_freq_model
│   └── pca
├── notebook
│   └── eda
├── results
│   ├── dataset_stats
│   ├── plots
│   │   └── pca_before_after
│   └── tsne
│       ├── no_pca_no_normalization
│       ├── pca_100_no_normalization
│       ├── pca_100_with_normalization
│       └── pca_30_with_normalization
├── src
│   ├── algorithms
│   ├── datasets
│   ├── experiments
│   │   └── config
│   ├── scripts
│   ├── transforms
│   └── utils
└── test
    ├── algorithms
    ├── data
    └── transforms
```

It is hard to justify how much work went into the software engineering just to run different variations of the PCA algorithm.

In many cases, it is hard to balance writing high quality code and trying as many methods as possible.

For more exploratory tasks, it is better to focus on modeling instead of writing production ready code.
