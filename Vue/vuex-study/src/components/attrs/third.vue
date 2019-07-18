<template>
  <div>
    <div>第三层</div>
    {{$attrs}}
    <button @click="changeA">修改地址</button>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  methods: {
    changeA() {
      this.$listeners.add('xxx')
    }
  },
}
</script>