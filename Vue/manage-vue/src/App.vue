<template>
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: 'wyh'
    }
  }
}
</script>

<style lang="scss">
  .container {
    height: 100vh;
    width: 100vw;
  }
</style>

