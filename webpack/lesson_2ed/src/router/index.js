import Vue from 'vue/dist/vue.esm'
import Router from 'vue-router'
import Home from '../pages/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HOME',
      component: Home,
      meta: {
        title: '首页'
      }
    }
  ]
})