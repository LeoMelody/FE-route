/*
 * @Author: leo 
 * @Date: 2018-09-04 10:32:52 
 * @Last Modified by: leo
 * @Last Modified time: 2018-09-04 10:59:03
 * 别名配置文件
 */
const path = require('path')
const resolve = (src) => path.resolve(__dirname, '..', src)

module.exports = {
  '@': resolve('src/components'),
  '@P': resolve('src/pages'),
  'vue$': 'vue/dist/vue.esm.js'
}
