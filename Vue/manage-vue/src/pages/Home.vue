<template>
  <div class="container">
    <button ref="btn" @click="showRef" class="btn">弹弹弹</button>
    <dd-dialog ref="dia"></dd-dialog>
  </div>
</template>

<script>
import ddDialog from '@/dialog'

export default {
  data() {
    return {

    }
  },
  methods: {
    showRef() {
      this.$refs.dia.$data.isShow = true
    }
  },
  components: {
    ddDialog
  }
}
</script>

<style lang="scss" scoped>
.container {
  text-align: center;
  .btn {
    font-size: 28px;
    height: 48px;
    line-height: 48px;
    width: 90%;
    margin: 10px auto;
    border: 1px solid #888;
    border-radius: 5px;
    outline: none;
  }
}
</style>
