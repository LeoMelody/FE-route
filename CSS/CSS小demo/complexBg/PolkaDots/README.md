### 这个项目用来实现一个波尔卡圆点图

![效果](https://gss3.bdstatic.com/7Po3dSag_xI4khGkpoWK1HF6hhy/baike/s%3D220/sign=27c9ec279dcad1c8d4bbfb254f3f67c4/9f510fb30f2442a7ceb401add943ad4bd113027b.jpg)


#### 技术点 

这个项目的技术点可以说比较简单，也就是使用radial-gradient() ，也就是径向渐变

#### 先实现规则的点状图

使用radial-gradient配合设置固定大小的bg-size即可很容易实现

#### 实现polka

使用background-position属性来偏移背景渲染起始点，从而达到圆点的偏移

如果配合上sass，将会实现更精彩的样式