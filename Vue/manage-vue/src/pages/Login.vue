<template>
  <div>
      <canvas class="bg-wrap" id="canvas"></canvas>
  </div>
</template>

<script>
import Back from '../canvas/Background'

export default {
  data() {
    return {
    }
  },
  mounted() {
    const back = new Back('#canvas')
  }
}
</script>

<style lang="scss">
  .bg-wrap {
    position: absolute;
    z-index: -1;
    width: 100vw;
    height: 100vh;
  }
</style>
