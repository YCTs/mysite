---
layout: post
title: 論文筆記 Attention is All You Need

mathjax: true
categories: 
---

##  論文出處：[Attention Is All You Need](https://arxiv.org/abs/1706.03762)


##  Model Architecture

![Imgur](https://i.imgur.com/GqVhKQT.png)

### Scaled Dot-Product Attention

$$ \mathrm {Attention}(Q, K, V) = \mathrm {softmax}(\frac {QK^T}{\sqrt {d_k}})V$$

[參考連結](http://jalammar.github.io/illustrated-transformer/)

### Multi-Head Attention

$$\mathrm {MultiHead}(Q, K, V) = \mathrm {Concate(head_1, ...., head_h)}W^O$$

where $\mathrm {head_i}$ = $\mathrm {Attention}(QW_i^Q, KW_i^K, VW_i^V)$


