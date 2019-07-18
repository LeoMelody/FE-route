## Vue 组件通信 & Vuex 学习笔记

### Vue的组件间通信方式

#### 1、props 

这个就没必要写了

#### 2、eventBus

eventBus本质就是利用一个公共的eventBus来进行事件的发布订阅功能。刚好Vue提供了这个能力，那么我们可以使用一个全新的Vue对象来做这个事情。现在假设这个Vue对象叫 eventVue

首先，所有的想要使用eventBus进行通信的组件均引入eventVue
发送消息的组件调用 eventVue 的 $emit方法注册并触发一个事件
此时，接收消息的组件 通过使用eventVue的$on方法来接收和处理这个事件。至此，完成通过eventBus来实现组件间通信的手段。 /eventBus

#### 3、$attrs/$listeners Vue2.4新增的API

关于 $attrs 这个属性可以获取到除在props中声明的属性外，父组件在当前组件上绑定的属性值。
如果有嵌套的组件，可以通过v-bind="$attrs"将这些属性向下传播。所以这个$attrs主要用于祖先级组件
给子孙级组件单向通信。那么，如何让子向父传递呢（子孙向祖先）？

$listeners 是用于处理上面这个问题的。可以通过 v-bind="$attrs" 向下传递数据，也可以通过
v-on="$listeners" 向下注册事件

#### 4、provide/inject Vue2.2新增API

从字面意思上就比较容易理解这一对属性的含义。 一个是提供者，一个是注入

简单的说，就是父组件可作为一个状态提供者（provide属性提供），而子组件则通过注入方式来接收状态