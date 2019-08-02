/*
 * @Author: leo 
 * @Date: 2019-08-01 10:26:12 
 * @Last Modified by: leo
 * @Last Modified time: 2019-08-01 10:28:03
 * Vue 入口文件
 */

import {initMixin} from './init'

/**
 * Vue 构造函数
 */
function Vue(options) {
  // 一些校验
  this._init(options)
}

initMixin(Vue)