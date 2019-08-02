/*
 * @Author: leo 
 * @Date: 2019-08-01 10:26:47 
 * @Last Modified by: leo
 * @Last Modified time: 2019-08-02 09:38:04
 * init
 */

let uid = 0

export function initMixin(Vue) {
  /**
   * Vue 初始化方法
   */
  Vue.prototype._init = function(options) {
    const vm = this
    vm._uid = ++uid // 设置一个唯一标示

    let startTag, endTag

    vm._isVue = true

    if (options && options._isComponent) {
      // TODO处理组件
    } else {
      // 此处生成$options
      vm.$options = mergeOptions()
    }
  }
}