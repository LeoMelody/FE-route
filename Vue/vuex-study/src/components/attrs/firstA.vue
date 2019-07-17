<template>
  <div>
    <p>Level1 sonA,下方数据为Attrs父组件给我的</p>
    <div>
      <p>从下面的打印可以看出，$attrs 就是用来获取当前组件的属性/属性值用的
        如果在props中定义了哪些属性是父组件传递给自组件通信用的数据，则$attrs就不会保留它</p>
      {{$attrs}}
    </div>
    <son-a v-bind="$attrs"/>
  </div>  
</template>

<script>
import sonA from './secondA'
export default {
  components: {
    sonA
  },
  props: {
    name: String,
    age: Number
  },
  inheritAttrs: true // inheritAttrs 是用来声明是否
}
</script>