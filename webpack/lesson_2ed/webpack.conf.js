const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/, // 提供正则来匹配.js结尾的文件
        // use: ['babel-loader'] // 匹配到这一类文件后，将其交给哪些loader去处理，这里我们先配置为最简单的模式
        loader: 'babel-loader',
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
    }),
    new CleanWebpackPlugin(['dist'], { // 接收一个数组和一个对象，数组来规定在指定目录下删除哪些文件，对象为配置项
      root: path.resolve(__dirname) // 定义开始清空的目录
    })
  ],
  devServer: {
    historyApiFallback: true,
  }
}