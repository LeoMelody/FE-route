<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png"><br>
    <router-link to="/eventBus">eventBus进行通信</router-link><br>
    <router-link to="/attrs">attrs进行通信</router-link><br>
    <router-link to="/props">props进行通信</router-link><br>

    <!-- <router-link to="/communication/eventBus">eventBus进行通信</router-link><br>
    <router-link to="/communication/eventBus">eventBus进行通信</router-link><br>
    <router-link to="/communication/eventBus">eventBus进行通信</router-link><br> -->
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home'
}
</script>
