<template>
  <div>
    <div>Title</div>
    <div class="list-wrap">
      <div @click="goDetail(item)" v-for="(item, index) in list" :key="index" class="list-item"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'list',
  data() {
    return {
      id: 0,
      list: []
    }
  },

  created() {
    this.id = this.$route.params.id
    this.getData()
  },

  methods: {
    getData() {
      fetch("http://localhost:3000")
        .then(data => data.json())
        .then(res => {
          this.list = res
        })
    },

    goDetail(item) {
      this.$router.push(`/about/${item.name}`)
    }
  }
}
</script>

<style scoped>
  .list-item {
    height: 60px;
    border-radius: 10px;
    background: #e5e5e5;
    margin-bottom: 10px;
  }
</style>
