const webpack = require('webpack')
const path = require('path')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')

const entry = path.join(__dirname, 'src', 'main.js') // TODO 后期更正为可配置

module.exports = {
  entry,
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist')
  },
  resolve: {
    '@': path.join(__dirname, 'src', 'components'),
    '@P': path.join(__dirname, 'src', 'pages'),
    'vue$': 'vue/dist/vue.esm.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ['vue-loader']
      },
      {
        test: /\.css$/,
        use: new ExtractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: [autoprefixer({browsers: ['iOS >= 7', 'Android >= 4.1']})]
              }
            }
          ]
        })
      },
      {
        test: /\.sass|scss$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.js$/,
      }
    ]
  }
}