<template>
  <div ref="dialog" class="dialog" v-show="isShow" @click.stop="close">
    <div slot="content" class="dialog-body" @click.stop="_stop">
      {{content}}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false
    }
  },
  methods: {
    open() {
      this.isShow = true
    },
    close() {
      this.isShow = false
    },
    _stop() {
      return
    }
  },
  props: {
    content: {
      type: [String, Number],
      default: '弹窗内容'
    }
  }
}
</script>

<style lang="scss" scoped>
  $content_high: 88px;
  $content_width: 300px;
  .dialog {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 999;
    background: rgba(0,0,0,.3);
    .dialog-body {
      height: $content_high;
      width: $content_width;
      line-height: $content_high;
      margin: 0 auto;
      margin-top: 180px;
      background: #fff;
      text-align: center;
    }
  }
</style>
