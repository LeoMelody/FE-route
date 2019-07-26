<template>
  <div>
    <div>姓名： {{$attrs.name}}</div>
    <Order v-bind="$attrs" v-on="$listeners"/>
  </div>
</template>
<script>
import Order from './Order.vue'
export default {
  data() {return {}},
  components: {
    Order
  },
  inheritAttrs: false
}
</script>
