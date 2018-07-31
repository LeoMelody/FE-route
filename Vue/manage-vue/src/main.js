import Vue from 'vue'
import App from './App.vue'
import router from './router'
// style
import './assets/style/base.scss'

// router config
router.beforeEach((to, from, next) => {
  if (to.matched.some(item => item.meta.requireAuth)) { // 如果需要校验登录状态
    let session = sessionStorage.getItem('session')
    if (session) {
      next()
    } else {
      next('/login')
    }
  } else if(!to.matched.length) {
    next('/default')
  } else {
    next()
  }
})

const app = new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})