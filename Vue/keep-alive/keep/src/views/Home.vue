<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <div class="block-wrap">
      <div v-for="(item,index) in list" class="block" @click="goListFunc(item)" :key="index"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      list: [
        1,2,3,4
      ]
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {

    },

    goListFunc(item) {
      this.$router.push(`/list/${item}`)
    }
  },

}
</script>

<style scoped>
.block-wrap {
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  justify-content: center;
}
.block {
  width: 120px;
  height: 120px;
  margin: 10px;
  background: #3a5ae9;
  border-radius: 20px;
}
</style>
