const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/, // 提供正则来匹配.js结尾的文件
        // use: ['babel-loader'] // 匹配到这一类文件后，将其交给哪些loader去处理，这里我们先配置为最简单的模式
        loader: 'babel-loader',
        exclude: '/node_modules/' // babel-loader不去处理
      },
      {
        test: /\.vue$/, // 匹配.vue结尾的文件
        loader: 'vue-loader',
        exclude: '/node_modules/'
      },
      {
        test: /\.css$/, 
        loader: 'style-loader!css-loader',
        exclude: '/node_modules/'
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html',
      title: 'DevServer'
    })
  ],
  devServer: {
    historyApiFallback: true,
  }
}