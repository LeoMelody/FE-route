import Vue from 'vue'
import VueRoute from 'vue-router'
// pages
import Login from '@P/Login.vue'
import Home from '@P/Home.vue'
import Default from '@P/Default.vue'

Vue.use(VueRoute)

export default new VueRoute({
  routes: [
    {
      path: '/',
      alias: '/home',
      name: 'Home',
      component: Home,
      meta: {
        requireAuth: true,
        title: '主页'
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        requireAuth: false,
        title: '主页'
      }
    },
    {
      path: '/default',
      name: 'Default',
      component: Default,
      meta: {
        requireAuth: false,
        title: 'Error Page'
      }
    }
  ]
})