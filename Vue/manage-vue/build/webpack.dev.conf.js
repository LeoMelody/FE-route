const Base = require('./webpack.base.conf')
const merge = require('webpack-merge')
const path = require('path')
const config = require('../config/index')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (env, argv) => {
  return merge(Base(env, argv), {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
      port: 8088,
      host: '0.0.0.0',
      overlay: {
        error: true
      },
      disableHostCheck: false,
      historyApiFallback: {
        rewrites: [{
          from: /.*/,
          to: path.posix.join(config.dev.assetsPublicPath, 'index.html') // 使用posix实现跨平台（windows的文件路径很扯淡）
        }]
      }
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'index.html',
        inject: true
      })
    ]
  })
}