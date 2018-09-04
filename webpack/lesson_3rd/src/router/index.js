import Vue from 'vue'
import Router from 'vue-router'
import Home from '@P/Home.vue'

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