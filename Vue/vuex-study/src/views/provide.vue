<template>
  <div>
    <input type="text" v-model="info.name">
    <Customer />
  </div>
</template>

<script>
import Customer from '../components/provide/Customer'
import Vue from 'vue'
export default {
  data() {
    return {
      info: {
        name: 'wyh',
        order: 18
      }
    }
  },
  components: {
    Customer
  },
  provide() {
    // 生成响应式对象
    this.data = Vue.observable(this.info)
    return {
      name: this.info.name,
      order: this.info.order,
      data: this.data
    }
  }
}
</script>
