import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// new Vue({
//   router,
//   store,
//   render: h => h(App)
// }).$mount('#app')

// ⚠️ 这里如果想要用 runtimeCompiler模式需要在vue.config.js中设置runtimeCompiler为true 可以参考 lib/base.js 中的alias配置
new Vue({
  el: '#app',
  components: {
    App
  },
  template: `<div class="title" :title="title">
    <div>
      <div>123</div>
    </div>
    <div name="name">123</div>
    <div name="name2">{{name}}</div>
  </div>`,
  router,
  data: {
    name: 'wyh',
    title: 'title2'
  }
})