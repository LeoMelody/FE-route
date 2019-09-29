<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>|
      <router-link to="/max/index">max</router-link>
    </div>
    <div>
      <div v-for="item in visit" :key="item.name">{{item.path}}</div>
    </div>
    <router-view/>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
export default {
  name: 'wyh',
  data() {
    return {
      name: 'xxxxxxxx'
    }
  },
  mounted() {
    this.setEmptyObjectTest(this.$route) 
  },
  computed: {
    ...mapState(["visit"])
  },
  methods: {
    ...mapActions(["setEmptyObjectTest"])
  },
  watch: {
    $route(val) {
      this.$nextTick(() => {
        this.setEmptyObjectTest(val)
      })
    }
  },
}
</script>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
