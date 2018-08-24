const path = require('path')
module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: '/\.js$/', // 提供正则来匹配.js结尾的文件
        // use: ['babel-loader'] // 匹配到这一类文件后，将其交给哪些loader去处理，这里我们先配置为最简单的模式
        loader: 'babel-loader'
      }
    ]
  }
}