<template>
  <div>
    <input type="text" v-model="info.name">
    <Customer />
  </div>
</template>

<script>
import Customer from '../components/provide/Customer'
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
    return {
      name: this.info.name,
      order: this.info.order
    }
  }
}
</script>
