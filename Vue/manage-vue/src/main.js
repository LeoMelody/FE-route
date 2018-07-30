import Vue from 'vue'
import App from './App.vue'

console.log(123)

const app = new Vue({
  el: '#app',
  components: {
    App
  },
  template: '<App/>'
})