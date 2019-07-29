<template>
  <div>
    姓名： {{name}} <br />
    响应式的姓名: {{data.name}}
    <Order />
  </div>
</template>

<script>
import Order from './Order'
export default {
  inject: ['name', 'data'],
  components: {
    Order
  }
}
</script>
