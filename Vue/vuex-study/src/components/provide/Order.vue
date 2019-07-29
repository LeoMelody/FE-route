<template>
  <div>
    当前订单数量: {{order}}
  </div>
</template>

<script>
export default {
  inject: {
    order: {
      from: 'order',
      default: 17
    }
  }
}
</script>