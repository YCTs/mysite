---
layout: post
title: 課程筆記 GAN
featured-img:
mathjax: true
categories: [GAN]
---

在閱讀GAN相關paper之前，可能會有一些基礎的知識要先了解，這邊我整理一些[李宏毅](http://speech.ee.ntu.edu.tw/~tlkagk/index.html)老師在課堂上的內容筆記。

## Introduction of Generative Adversarial Network (GAN)

#### Discriminator

*   In each training iteration:
    *   Discriminator

        *   Sample  m examples { $x^1, x^2,...., x^m$} from database.
        *   Sample  m noise samples { $z^1, z^2,...., z^m$ } from a distribution.
        *   Obtaining generated data { $\tilde x^1,..., \tilde x^m$ }, 其中 $$\tilde x^i = G(z^i)$$
        *   Update discriminator parameters $\theta_d$ to maximize $\tilde V$

            *   $$\tilde V = \frac 1 m \sum_{i=1}^{m} logD(x^i) + \frac 1 m \sum_{i=1}^{m} log(1 - D(\tilde x^i))$$
            *   $$\theta_d \gets \theta_d + \eta\nabla\tilde V(\theta_d)$$
    
    *   Generator

        *   Sample  m noise samples { $z^1, z^2,...., z^m$ } from a distribution.
        *   Update generator parameters $\theta_g$ to maximize $\tilde V$ 

            *   $$\tilde V = \frac 1 m \sum_{i=1}^{m} log(D(G(z^i)))$$
            *   $$\theta_g \gets \theta_g + \eta\nabla\tilde V(\theta_g)$$

##  Basic Theory
### Maximun Likelihood Estimation
*   給定一real data的distribution $P_{data}(x)$
*   generator的分佈為 $P_G(x;\theta)$
*   目標是找出一組參數 $\theta$ 使得 $P_{data}$ 和$P_G$ 越相近越好。

從真實資料分布 $P_{data}$ 取樣出{ $x^1,...,x^m$ }，將取樣出的 $x^i$ 代入  $P_G$ 之後相乘，可得到：

$$L = \prod_{i=1}^{m}P_G(x^i;\theta) $$

最後找出可以使 $$L$$ 越大越好的$$\theta$$。

### Maximun Likelihood Estimation = Minimize KL Divergence

從真實資料分布 $P_{data}$ 取樣出{ $x^1,...,x^m$ }。

$$\theta^* = \operatorname*{arg\,max}_{\theta} \prod_{i=1}^{m} P_G(x^i;\theta)$$

$$ = \operatorname*{arg\,max}_{\theta} \sum_{i=1}^{m} logP_G(x^i;\theta)$$

上式可解讀為：欲找到一個 $\theta$ ，使得從 $P_{data}$ 隨機取樣到的 $x_i$ 計算其在 $P_G$ 中的機率取log後相加可以越大越好。由於在data中要取到某個 $x_i$ 也有一對應的機率，
故上式可以視為一種期望值的逼近:

$$\approx \operatorname*{arg\,max}_{\theta} E_{x\sim P_{data}}[logP_G(x;\theta)]$$

$$ = \operatorname*{arg\,max}_{\theta} \int\limits_x P_{data}(x)logP_G(x;\theta) \mathrm d x$$

$$ = \operatorname*{arg\,max}_{\theta} ( \int\limits_x P_{data}(x)logP_G(x;\theta) \mathrm d x - \int\limits_x P_{data}(x)logP_{data}(x) \mathrm d x)$$

上式最後一項跟 $\theta$ 無關，故可視為常數不影響求值，目的是要導入KL Divergence:

$$= \operatorname*{arg\,min}_{\theta} KL(P_{data}||P_G)$$

### Generator:
假設G是一個network，我們利用G來定義一個機率分佈$$P_G$$，如下圖（圖片來自李宏毅老師上課講義）
*   ![Imgur](https://i.imgur.com/VCx5Sky.png)

而我們的目標是：

$$G^* = \operatorname*{arg\,min}_G Div(P_G, P_{data})$$

其中 $Div(P_G, P_{data})$ 代表兩個分部之間的Divergence。

### Discriminator

Objective Function for Discriminator:

$$V(G, D) = E_{x\sim P_{data}}[logD(x)] + E_{x\sim P_G}[log(1 - D(x))]$$

Training:

$$D^* = \operatorname*{arg\,max}_D V(D, G)$$


        

