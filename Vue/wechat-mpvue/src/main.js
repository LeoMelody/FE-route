import Vue from 'vue'
import App from './App'
import store from './store'


Vue.config.productionTip = false
App.mpType = 'app'
App.store = store

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: ['pages/logs/main', '^pages/home/main'],
    window: {
      "backgroundTextStyle": "light",
      "navigationBarBackgroundColor": "#000",
      "navigationBarTitleText": "大道云贷",
      "navigationBarTextStyle": "white"
    },
    tabBar: {
      "color": "#a9b7b7",
      "selectedColor": "#11cd6e",
      "borderStyle": "white",
      "list": [
        {
          "pagePath": "pages/home/main",
          "text": "首页",
          "iconPath": "/images/yundai/index.png",
          "selectedIconPath": "/images/yundai/index1.png"
        },
        {
          "pagePath": "pages/home/main",
          "text": "订单",
          "iconPath": "/images/yundai/orderList.png",
          "selectedIconPath": "/images/yundai/orderList1.png"
        },
        {
          "pagePath": "pages/person/main",
          "text": "我的",
          "iconPath": "/images/yundai/personal_info.png",
          "selectedIconPath": "/images/yundai/personal_info1.png"
        }
      ]
    }
  }
}
