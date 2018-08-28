/*
 * @Author: leo 
 * @Date: 2018-08-28 11:51:03 
 * @Last Modified by: leo
 * @Last Modified time: 2018-08-28 15:34:01
 * 开发环境下的webpack配置
 */
const path = require('path')
// 定义resolve函数便于处理路径
const resolve = (path) => path.resolve(__dirname, '..', path)
const merge = require('webpack-merge')
const Base = require('./webpack.config.base')

module.exports = merge(Base, {
  devServer: {
    historyApiFallback: true,
  }
})