## Vue 组件通信 & Vuex 学习笔记

### Vue的组件间通信方式

#### 1、props 

这个就没必要写了

#### 2、eventBus

eventBus本质就是利用一个公共的eventBus来进行事件的发布订阅功能。刚好Vue提供了这个能力，那么我们可以使用一个全新的Vue对象来做这个事情。现在假设这个Vue对象叫 eventVue

首先，所有的想要使用eventBus进行通信的组件均引入eventVue
发送消息的组件调用 eventVue 的 $emit方法注册并触发一个事件
此时，接收消息的组件 通过使用eventVue的$on方法来接收和处理这个事件。至此，完成通过eventBus来实现组件间通信的手段。 /eventBus

#### 3、$attrs/$listeners