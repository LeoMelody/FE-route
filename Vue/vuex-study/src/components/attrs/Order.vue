<template>
  <div>
    订单数: {{$attrs.order}}<button @click="add">增加</button>
  </div>
</template>
<script>
export default {
  methods: {
    add() {
      this.$listeners.add(this.$attrs.index)
    }
  }
}
</script>
