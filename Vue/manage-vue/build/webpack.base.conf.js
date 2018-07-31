const webpack = require('webpack')
const path = require('path')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer')
const entry = path.resolve(__dirname, '../src', 'main') // TODO 后期更正为可配置
const VueLoaderPlugin = require('vue-loader/lib/plugin') // webpack4
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

console.log('根目录？', __dirname)
// console.log(process.env.NODE_ENV)

module.exports = (env, argv) => {
  return {
    entry,
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, '../dist')
    },
    resolve: {
      alias: {
        '@': path.join(__dirname, '../src', 'components'),
        '@P': path.join(__dirname, '../src', 'pages'),
        'vue$': 'vue/dist/vue.esm.js'
      }
    },
    module: {
      rules: [{
          test: /\.vue$/,
          use: ['vue-loader']
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: [autoprefixer({
                  browsers: ['iOS >= 7', 'Android >= 4.1']
                })]
              }
            }
          ]
        },
        {
          test: /\.sass|scss$/,
          use: [
            argv.mode === 'production' ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader', {
              loader: 'postcss-loader',
              options: {
                plugins: [autoprefixer({
                  browsers: ['iOS >= 7', 'Android >= 4.1']
                })]
              }
            }, 'sass-loader'
          ] // 配置autoprefixer
        }
      ]
    },
    plugins: [
      new VueLoaderPlugin(),
      // new ExtractTextWebpackPlugin('style.css'),
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css'
      })
    ]
  }
}