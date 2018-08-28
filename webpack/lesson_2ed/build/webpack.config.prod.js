/*
 * @Author: leo 
 * @Date: 2018-08-28 11:54:53 
 * @Last Modified by: leo
 * @Last Modified time: 2018-08-28 15:30:56
 * webpack 生产配置文件
 */
const path = require('path')
// 定义resolve函数便于处理路径
const resolve = (src) => path.resolve(__dirname, '..', src)
const merge = require('webpack-merge')
const Base = require('./webpack.config.base')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports =  merge(Base, {
  plugins: [
    new CleanWebpackPlugin(['dist'], { // 接收一个数组和一个对象，数组来规定在指定目录下删除哪些文件，对象为配置项
      root: resolve('/') // 定义开始清空的目录
    })
  ]
})
