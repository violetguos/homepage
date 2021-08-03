---
title: "The Downsides of Machine Learning: After the Buzzwords Fade"
date: "2021-03-07"
coverImage: "./apple_not_apple.png"
category: ["machine learning"]
---

While I love what I do, here's a very quick laundry list of the reality of machine learning in industry.

```
1. Chasing after publication and research grants
    - The peer review process is broken. Read more [here](https://www.reddit.com/r/MachineLearning/comments/hiv3vf/d_the_machine_learning_community_has_a_toxicity/)
2. Reproducibility challenges due to lack of SWE rigour
    1. If a paper claims to achieve X% accuracy, I expect to
        1. checkout their repo
        2. install relevant libraries
        3. Run the model evaluation scripts
        4. and get this X% in my terminal output.
        5. However, that’s not the case. Often, the repos never even provide all the relevant python packages, so we’d fail at Step 2. And yes, sometimes you fail at step 1.
3. Disregard of production realities
    1.  If a piece of software only works on one’s PC, then how can you expect someone else to reverse engineer everything?
    2. Some companies have already developed two separate teams of ML scientists and developers. While this is acceptable, since they're unicorn jobs, it's extremely counter-productive for developers to reverse engineer everything from scratch in order to *productionize* a model.
    3. [Machine Learning: The High Interest Credit Card of Technical Debt](https://research.google/pubs/pub43146/)
4. Reduced hiring during the pandemic
    1. Uber sold its research lab.
    2. Element AI got acquired at a lower evaluation.
5. *The Black Swan*.
    - Go read NNT's book. I haven't finished myself actually. Here's a quote
    > Statistically sophisticated or complex methods do not necessarily provide more accurate forecasts than simpler ones.
```

Stay tuned for another post on the plus side of machine learning.
