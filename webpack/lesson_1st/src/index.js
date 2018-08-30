import Vue from 'vue/dist/vue.esm'
import App from './App.vue'

const vm = new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})

console.log(123)