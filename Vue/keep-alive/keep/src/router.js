import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import List from './views/List.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        deepth: 0.5
      }
    },
    {
      path: '/list/:id',
      name: 'list',
      component: List,
      meta: {
        keepAlive: true,
        deepth: 1
      }
    },
    {
      path: '/about/:name',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
      meta: {
        deepth: 2
      }
    }
  ]
})
