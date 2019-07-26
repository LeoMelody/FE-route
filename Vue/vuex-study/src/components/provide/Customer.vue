<template>
  <div>
    姓名： {{name}}
    <Order />
  </div>
</template>

<script>
import Order from './Order'
export default {
  inject: ['name'],
  components: {
    Order
  }
}
</script>
