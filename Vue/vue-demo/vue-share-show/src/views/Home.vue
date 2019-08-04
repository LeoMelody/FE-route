<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  beforeCreate() {
    console.log('Home beforeC')
  },

  created() {
    console.log('Home created')    
  },

  beforeMount() {
    console.log('Home beforeM')    
  },
  mounted() {
    console.log('Home mounted')
  },
}
</script>
