<template>
  <div id="app">
    <UIframe>
      <HelloWorld :msg="text"/>
    </UIframe>
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld :msg="text"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import UIframe from "./components/UIframe";

export default {
  name: 'app',
  data() {
    return {
      text: "123"
    }
  },
  components: {
    HelloWorld,
    UIframe
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
