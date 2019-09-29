import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import EventBus from './views/EventBus.vue'
import Attrs from './views/Attrs.vue'
import Props from './views/Props.vue'
import Provide from './views/provide.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/eventBus',
      name: 'eventBus',
      component: EventBus
    },
    {
      path: '/attrs',
      name: 'attrs',
      component: Attrs
    },
    {
      path: '/props',
      name: 'props',
      component: Props
    },
    {
      path: '/provide',
      name: 'provide',
      component: Provide
    },
    {
      path: "/max",
      name: "max",
      component: Home,
      children: [
        {
          path: "index",
          name: "maxIndex",
          component: () => import("./views/Max/index")
        }
      ]
    }
  ]
})
