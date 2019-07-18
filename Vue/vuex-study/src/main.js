import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.mixin({
  mounted() {
    console.log('sss') // 解释下这个打印的过程：   
  },
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
