---
layout: post
title: 課程筆記 GAN
featured-img: emile-perron-190221
mathjax: true
categories: [GAN]
---

在閱讀GAN相關paper之前，可能會有一些基礎的知識要先了解，這邊我整理一些[李宏毅](http://speech.ee.ntu.edu.tw/~tlkagk/index.html)老師在課堂上的內容筆記。

在此之前，先整理一些數學基礎：

## KL Divergence vs Cross Entropy

### 1. Entropy:

$$ S = - \sum_i p(x_i)log_b(x_i)$$

### 2. Cross Entorpy

事件集合ㄧ事件 $x_i$，相對於真實分佈 A 而言， 分佈B編碼分佈A的平均bit長度（因為分佈機率不均勻，故為期望值）。 

$$H(A, B) =  - \sum_i P_A(x_i)log P_B(x_i)$$

在二分問題中:

$$P_A(x = 1) = a \implies P_A(x = 0) = 1 - a$$

其中A為真實分佈，故a = 1。

$$P_B(x = 1) = b \implies P_B(x = 0) = 1 - b$$

若計算 $H(A, B)$ ：

$$x_i = 1  \implies P_A(x_i)log P_B(x_i) = alogb $$

$$x_i = 0  \implies P_A(x_i)log P_B(x_i) = (1 - a)log(1 - b) $$

綜合上二式剛好與二分類問題的Maximun Likelihood相同 : 

$$ \sum_i alogb + (1 - a) log(1-b)$$


### 3. Divergence:

計算分佈差距：

$$KLDiv(A||B) = \sum_i P_A(x_i) log \bigg(\frac {P_A(x_i)} {P_B(x_i)} \bigg) $$

$$ = \sum_i P_A(x_i) log \big(P_A(x_i) \big) - \sum_i P_A(x_i) log \big(P_B(x_i) \big)$$

由上可觀察出若 $P_A$ = $P_B$ ，則
$KLDiv(A||B) = 0$

且 $KL Divergence = S(A) - H(A, B)$，而在訓練時 $A$ 為訓練集已給定，故可用 H(A, B)等價於分布差異而做訓練。



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

$$V = E_{x\sim P_{data}} [logD(x)] + E_{x\sim P_G} [log(1 -D(x))]$$

$$ = \int\limits_x P_{data}(x)logD(x) \mathrm d x + \int\limits_x P_G (x)log(1- D(x)) \mathrm d x$$

$$ = \int\limits_x [ P_{data}(x)logD(x) + P_G (x)log(1- D(x))] \mathrm d x$$

以下討論：

$$\operatorname*{max}_D V(D, G) = V(D^*,G)$$

$$V = E_{x\sim P_{data}} [logD(x)] + E_{x\sim P_G} [log(1 -D(x))]$$

$$ = \int\limits_x P_{data}(x)logD(x) \mathrm d x + \int\limits_x P_G (x)log(1- D(x)) \mathrm d x$$

$$ = \int\limits_x [ P_{data}(x)logD(x) + P_G (x)log(1- D(x))] \mathrm d x$$

找一個 $ D^* $ 可以使得上述 $V$ 最大。其中假設 $D(x)$ 可為任意function。故可視為：給定一 $x$ ，找一個 $D^*$ 使得:

$$P_{data}(x)logD(x) + P_G (x)log(1- D(x))$$

有最大值。求最大值，故令 $f(D) = alog(D) + blog(1-D)$

$$\frac {\mathrm d f(D)} {\mathrm d D} = a \times \frac 1 D + b \times \frac 1 {1-D} \times (-1) = 0$$

$$\implies a \times \frac 1 {D^*} = b \times \frac 1 {1-D^*}$$

$$\implies D^* = \frac a {a+b}$$

$$\implies D^*(x) = \frac {P_{data}(x)} {P_{data}(x) + P_G(x)}$$

接著，將 $ D^* (x) = \frac {P_{data}(x)} {P_{data}(x) + P_G(x)}$ 帶入 $V(D^*, G) $ :

$$V(D^*, G)$$

$$ = E_{x\sim P_{data}} [log \frac {P_{data}(x)} {P_{data}(x) + P_G(x)}] + E_{x\sim P_G} [log\frac {P_G (x)} {P_{data}(x) + P_G(x)}]$$

$$ =  \int\limits_x \bigg[ P_{data}(x)log \frac {P_{data}(x)} {P_{data}(x) + P_G(x)} + P_G (x)log\frac {P_G (x)} {P_{data}(x) + P_G(x)}\bigg] \mathrm d x$$

$$ =  \int\limits_x \bigg[ P_{data}(x)log \frac {\frac 1 2 P_{data}(x)} {\frac 1 2 [P_{data}(x) + P_G(x) ]} + P_G (x)log\frac {\frac 1 2 P_G (x)} {\frac 1 2 [P_{data}(x) + P_G(x)]}\bigg] \mathrm d x$$

$$ = -2log2 +  \int\limits_x \bigg[ P_{data}(x)log \frac {P_{data}(x)} {\frac 1 2 [P_{data}(x) + P_G(x) ]} + P_G (x)log\frac {P_G (x)} {\frac 1 2 [P_{data}(x) + P_G(x)]}\bigg] \mathrm d x$$

$$ = -2log2 + KL(P_{data}|| \frac {P_{data}+ P_G} 2) + KL(P_G|| \frac {P_{data}+ P_G} 2)$$

$$ = -2log2 + 2JSD(P_{data}||P_G)$$

Jensen-Shannon divergence
$JSD$ :

$$JSD(P||Q) = \frac 1 2 D(P||M) + \frac 1 2 D(Q||M), \quad M = \frac 1 2 (P+Q)$$

### Discriminator + Generator
前面提到，在Generator要解的目標函數式

$$G^* = \operatorname*{arg\,min}_G Div(P_G, P_{data})$$

因為也提到，在Discriminator的目標函數：

$$D^* = \operatorname*{arg\,max}_D V(D, G)$$

且已推導出：

$$\operatorname*{max}_D V(D, G) = V(D^*,G)$$

$$ = -2log2 + 2JSD(P_{data}||P_G)$$

則可把 $Div(P_G, P_{data}) 代換成：

$$\operatorname*{max}_D V(D, G)$$

得到：

$$G^* = \operatorname*{arg\,min}_G \operatorname*{max}_D V(D, G)$$

![Imgur](https://i.imgur.com/T22hgwk.png)

### In Practice
Sample  m examples { $x^1, x^2,...., x^m$} from database.

Generated data { $\tilde x^1,..., \tilde x^m$ }

實作上無法以積分計算期望值，故 $V = E_{x\sim P_{data}} [logD(x)] + E_{x\sim P_G} [log(1 -D(x))]$會用下式：

$$\tilde V = \frac 1 m \sum_{i=1}^{m} logD(x^i) + \frac 1 m \sum_{i=1}^{m} log(1 - D(\tilde x^i))$$

觀察發現 Maximize $\tilde V$ 可等價於 Minimize 二元分類的 Cross Entropy。D為一Binary Classifier，sigmoid output 0~1之間。一類為real一類為fake。


### Algorithm

![Imgur](https://i.imgur.com/G6w9DpP.png)









        

