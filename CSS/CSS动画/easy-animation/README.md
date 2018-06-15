### animation

animation相比较与transition是更为强大的。通过定义@keyframes 的动画名称 ，可以定义多个状态时的不同表现力。

animation的属性名称

 > animation: name duration timing-function delay iteration-count direction fill-mode;

```
    name: 动画名称
    duration: 规定完成动画所花费的时间
    timing-function: 规定动画的速度曲线方法  (ease-in这些的)   http://www.w3school.com.cn/cssref/pr_animation-timing-function.asp
    delay: 动画开始时的延时
    iteration-count: 规定动画应该播放的次数。 n 表示次数  infinite 表示永远播放
    direction: 定义动画播放的方向（正向还是反向） reserve 反向播放   alternate 奇数正向 偶数反向  alternate-reserve 和alternate相反
    fill-mode: 规定当动画不播放时（当动画完成时，或当动画有一个延迟未开始播放时），要应用到元素的样式。 // 这个有点迷
```
@keyframes 规则
> @keyframes animationname {keyframes-selector {css-styles;}}

```
    animationname 动画名称

    keyframes-selector 动画持续时间百分比  from (等同于0%) to(100%)

    css-styles css样式
```

eg1、 缓动效果： 弹跳的小球