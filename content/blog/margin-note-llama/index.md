---
title: "What MLEs can learn from the LLaMA Paper About Efficient LLM Models"
date: "2024-05-17"
coverImage: "../ecg-signal/math.jpg"
category: ["machine learning"]
---

I recently read the LLAMA paper from an industry pracitioner's point of view.
The quoted sections are exerepts from the original paper. The following comments, questions, and observations are based on my margin notes.

> However, recent work from Hoffmann et al. (2022) shows that, for a given compute budget, the best performances are not achieved by the largest mod- els, but by smaller models trained on more data.
> The objective of the scaling laws from Hoff- mann et al. (2022) is to determine how to best scale the dataset and model sizes for a particular training compute budget. However, this objective disregards the inference budget, which becomes critical when serving a language model at scale.

very insghtful remark with practical implications in model serving for most user facing products.

> 2.1 Pretraining Data

Meta preprocessed text data with basic non DL models, such as

- CCNET pipeline
- fast text linear classifeir

> The preprocessing of C4 also contains deduplication and language identifi- cation steps: the main difference with CCNet is the quality filtering, which mostly relies on heuris- tics such as presence of punctuation marks or the number of words and sentences in a webpage

I wonder if they did any hyper parameter tuning, e.g. empirical observation of different heuristics used instead of just presence of puncation.

> Github
> we filtered low quality files with heuristics based on the line length or proportion of alphanumeric characters, and removed boilerplate, such as headers, with reg- ular expressions.

How did they decide whcih regex to use?

> arXiv. We process arXiv Latex files to add scientific data to our dataset. Following Lewkowycz et al. (2022), we removed everything before the first section, as well as the bibliography. We also removed the comments from the .tex files, and inline-expanded definitions and macros written by users to increase consistency across papers.

In Lwekowycz et al, they explianed this preprocessing in more detail. In a typical NeurIps paper, the format is set by the conference. It roughyly follows the following structure.

```
\userpackage{some_package}
\some_customized_color_for_fancy_plots
\author_list{some names}
\title{impressive acronym for the model}
% some comment
% or a lot of comments
\begin{abstract}
usually we only read this
\end{abstract}

\section{One big section}
continues until conclusion

\include{compiled bibliography}

\appendex{some extra info}
```

Lwekowycz et al removed the bibliography as well as everything before the first `\section`. I am curious why they chose to exclude the abstract. Their work intended to train language models to perform on mathemtical text. Would including the abstracts that summarize the overall research and mathematical princples enhance the model's peroformance on mathematical reasoning?

No explanation was given by LLAMA authors or Lewkowycz et al.

> Pre-normalization [GPT3]. To improve the training stability, we normalize the input of each transformer sub-layer, instead of normalizing the output. We use the RMSNorm normalizing func- tion, introduced by Zhang and Sennrich (2019).

Did they run into numerical stability issues in the input layer even before the activitions? Or was it just done to boost performance? What about other normalization methods?

> This imple- mentation, available in the xformers library,2 is inspired by Rabe and Staats (2021) and uses the backward from Dao et al. (2022). This is achieved by not storing the attention weights and not com- puting the key/query scores that are masked due to the causal nature of the language modeling task.

For masked tokens, they simply skipped the computation.

> To further improve training efficiency, we re- duced the amount of activations that are recom- puted during the backward pass with checkpoint- ing. More precisely, we save the activations that are expensive to compute, such as the outputs of linear layers. This is achieved by manually imple- menting the backward function for the transformer layers, instead of relying on the PyTorch autograd.

The authors played with pytorch's autograd. My team did this when we tried to train a Wasserstein GAN. In any neural network, normally PyTorch builds a graph based on all the matrix transoformations you define, and does all the matrix calculus for you automatically. When you disable autograd, from that layer going backward, you are on your own. You need to

1. derive the matrix calculus needed for backpropagation
2. program it
3. ensure the matrix dimensions are correct
4. enhance the performance, address issues such as OOM and parallelism

Ideally, the authors shouldn't skim over this section, as it is extremely hard. Many folks in industry would benefit greatly if they could be more candid and discuss things they've tried, and what worked vs what didn't work.

Fortunately, Meta researchers were generous and provided a link to their repo. This [customzied back propagation function](https://github.com/facebookresearch/xformers/blob/6e1718b4af7e80087b9a247a6cd100b0cd2be339/xformers/components/reversible.py#L87) looks like their customized gradient calculation in the backpropagation.

```python
    def backward_pass(
        self, y: torch.Tensor, dy: torch.Tensor, f_args={}, g_args={}
    ):  # pragma: no cover  # this is covered, but called directly from C++
        y1, y2 = torch.chunk(y, 2, dim=self.split_dim)
        del y

        dy1, dy2 = torch.chunk(dy, 2, dim=self.split_dim)
        del dy

        with torch.enable_grad():
            y1.requires_grad = True
            gy1 = self.g(y1, set_rng=True, **g_args)
            torch.autograd.backward(gy1, dy2)

        with torch.no_grad():
            x2 = y2 - gy1
            del y2, gy1

            dx1 = dy1 + y1.grad
            del dy1
            y1.grad = None

        with torch.enable_grad():
            x2.requires_grad = True
            fx2 = self.f(x2, set_rng=True, **f_args)
            torch.autograd.backward(fx2, dx1)

        with torch.no_grad():
            x1 = y1 - fx2
            del y1, fx2

            dx2 = dy2 + x2.grad
            del dy2
            x2.grad = None

            x = torch.cat([x1, x2.detach()], dim=self.split_dim)
            dx = torch.cat([dx1, dx2], dim=self.split_dim)

        return x, dx
```

The lines such as `del y` and `del dy` were probably added to address OOM issues. The authors switched between `x2.detach()`, `with torch.no_grad()` and `with torch.enable_grad()`, and combined the results. This was what the authors meant by "[saving] the activations that are expensive to compute" during the backward pass.

The rest of the paper focuses on analyzing model peroformance on standard metrics and benchmarks in NLP. It was trained on Meta's GPU cluster for 21 days. Essentially, in order to improve model performance during training and inference, it requires a combination of mathematical and engineering rigor.

The quoted text are from LLaMA: Open and Efficient Foundation Language Models by Touvron et al, https://arxiv.org/abs/2302.13971

Code: https://github.com/facebookresearch/xformers
