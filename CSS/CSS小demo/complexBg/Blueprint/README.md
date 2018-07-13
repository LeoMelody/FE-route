### 如何实现格中格？

#### 1、我们先想法实现格子布：

也就是设置背景大小为每一块格子的大小50px，然后在相应的背景大小上设置白色到蓝色的渐变：

白色2px 蓝色 0，那么就会有格子布状的样子

#### 2、那么如何在格子中再实现格子的效果呢？

因为这时候我还不是太了解background-size的属性的用法，我想到了一个黑科技

我在blue-print上加一个蒙层，然后在这个蒙层上也画格子，不过格子大小要小一些，10px。这样是不是就有效果了呢？

不出我所料，这个黑科技奏效了

#### 3、如何利用background-size来更好的实现这个效果

虽然我的黑科技也奏效了，但是毕竟只是黑科技，也有一定的局限性。

在此之前我们先来学习一下background-size

误区1，background-size是设置背景大小，在上面的说法中，我提到设置背景大小，这句话实际上是有问题的，background-size是用来设置背景图片大小的属性，以象素或百分比显示

1、定义：

background-size 用来调整背景图像的尺寸大小。

2、语法：

以下为引用内容：
background-size : contain | cover | 100px 100px | 50% 100%;

background-size：contain; // 缩小图片来适应元素的尺寸（保持像素的长宽比）；
background-size ：cover; // 扩展图片来填满元素（保持像素的长宽比）；
background-size ：100px 100px; // 调整图片到指定大小；
background-size ：50% 100%; // 调整图片到指定大小，百分比相对于包含元素的尺寸。

但是，只有这些是不够的。background可以设置多个值

/* 逗号分隔的多个值：设置多重背景 */
background-size: auto, auto     /* 不同于background-size: auto auto */
background-size: 50%, 25%, 25%
background-size: 6px, auto, contain

只是看定义肯定是不够的，再结合实现格子效果的代码1好好思考一下

我大胆猜测，是不是每一个background-size来对应一个background-image

我们不妨把格子的代码改动一下：

由于不好截图，所以这里移步映像笔记  CSS/你不知道background-size与background-image