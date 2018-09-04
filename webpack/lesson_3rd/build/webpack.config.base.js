/*
 * @Author: leo 
 * @Date: 2018-08-28 11:50:44 
 * @Last Modified by: leo
 * @Last Modified time: 2018-09-04 10:57:38
 * webpack 基础配置文件
 */

const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
// 定义resolve函数便于处理路径
const resolve = (src) => path.resolve(__dirname, '..', src)
const config = require('./config')
const alias = require('./alias')

module.exports ={
  entry: resolve('src/index.js'),
  output: {
    filename: '[name].[hash].js',
    path: resolve('dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: '/node_modules/'
      },
      {
        test: /\.vue$/, // 匹配.vue结尾的文件
        loader: 'vue-loader',
        exclude: '/node_modules/'
      },
      {
        test: /\.css$/, 
        use: [MiniCSSExtractPlugin.loader, 'css-loader'],
        exclude: '/node_modules/'
      },
      {
        test: /\.(png|jpg|gif)$/, // 匹配png，jpg，gif这三类图片
        loader: 'url-loader?limit=8192' // 限制大小小于8192b的图片会转为base64
      },
      {
        test: /\.(sass|scss)$/, // 匹配sass或scss
        use: [MiniCSSExtractPlugin.loader, 'css-loader','sass-loader']
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html',
      title: 'DevServer'
    }),
    new MiniCSSExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].css'
    })
  ],
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias
  }
} 