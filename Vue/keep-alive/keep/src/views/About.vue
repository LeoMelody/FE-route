<template>
  <div class="about">
    <h1>My Name is {{name}}号先生</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: ''
    }
  },

  created() {
    this.name = this.$route.params.name
  }
}
</script>
