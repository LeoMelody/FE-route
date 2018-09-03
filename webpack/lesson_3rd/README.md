[TOC]

### 扯淡的话

我认为，学习这种工具类型的技能，掌握基础部分的话，后面的就是只需要记住和主动去学习属性配置就会玩的很好。
这一部分就是通过各种各样的loader和plugin的属性配置来将基础部分的webpack配置。

### 明显存在的问题

在lesson1中有很多明显的问题：

- 1、css代码冗杂在js代码中
- 2、打包出来的文件一直为一个bundle.js会引起浏览器缓存
- 3、开发代码和打包发布（生产）代码没有严格区分
- 4、无图片，json等其他文件类型的处理

那么下面便一点点的解决上述的问题：

#### 抽离CSS代码

在webpack4之前，可以用[extract-text-webpack-plugin](https://www.npmjs.com/package/extract-text-webpack-plugin)这个插件来解决这一问题。webpack4 暂不支持extract-text-webpack-plugin 所以需要使用extract-text-webpack-plugin@next版本 或者使用 [mini-css-extract-plugin](https://www.npmjs.com/package/mini-css-extract-plugin)

配置也是非常简单：

第一步需要在匹配到css代码时用到这个插件：
```
     {
        test: /\.css$/, 
        use: [MiniCSSExtractPlugin.loader, 'css-loader'], // 使用MiniCSSExtractPlugin.loader来处理css代码
        exclude: '/node_modules/'
      }
```

第二步是在plugins属性中配置MiniCSSExtractPlugin
```
plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html',
      title: 'DevServer'
    }),
    new MiniCSSExtractPlugin({
      filename: '[name].css' // 配置单独出来的CSS文件名称，默认为main.css
    })
  ],
```
build后：
![build2.png](https://upload-images.jianshu.io/upload_images/7140391-5650f45b95c1b6c5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

同时，`index.html`会自动引入bundle.js和main.css这两个文件。打包生产的时候，直接把dist目录上传上去就ok了。

#### 解决浏览器缓存问题

浏览器自动缓存了js和css文件是生产中常见的一个问题。解决方法却是很简单，我们只需将文件名称完全更改html就会重庆获取一次全新的js和css文件。为了保证文件名称的唯一，在打包时我们采用hash值来帮助命名

```
// 输出js文件名修改
output: {
    filename: '[name].[hash].js', 
    path: path.resolve(__dirname, 'dist')
  },

// 单独抽离出来的css名称修改
new MiniCSSExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].css'
    })
```
build结果：
![build3.png](https://upload-images.jianshu.io/upload_images/7140391-be0d593fe7f5ea1c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

这个问题的解决方案比较简单，但是也伴随着另一个问题，如果我们再修改一次代码build后，会出现下面这种情况：
![build4.png](https://upload-images.jianshu.io/upload_images/7140391-a8fdc3907ea41364.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

它不会清除之前存在的文件。这里有两个方案供大家选择：

一是使用[clean-webpack-plugin](https://www.npmjs.com/package/clean-webpack-plugin)

```
// 在plugins中添加这个插件配置
new CleanWebpackPlugin(['dist'], { // 接收一个数组和一个对象，数组来规定在指定目录下删除哪些文件，对象为配置项
      root: path.resolve(__dirname) // 定义开始清空的目录
    })
```

这时候我们在运行build的时候就会发现dist文件先被删除掉，然后生成了新的dist文件。不过还有个小缺陷就是在运行dev命令时，也会删除掉dist文件。这个问题会在后面的优化中解决。

第二个使用[rimraf](https://www.npmjs.com/package/rimraf)库来完成删除dist文件夹。这个库提供的是`rm -rf`的删除能力。关于这个清除功能，这里就不写了，我觉得初学者这里会用上面那个插件就好。

#### 区分dev和prod

写到这里，前面的坑实在太多了，我必须要区分一下开发和生产这两种环境了。现在我要对整个项目的结构做一些调整了：

![org2.png](https://upload-images.jianshu.io/upload_images/7140391-879713f2caf2e0cb.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
这三个配置文件各司其职，这样做可以将dev的功能和build的功能以及他们共有的操作抽象出来。
这三个配置文件又是相互之间有联系的，这里要用到webpack-merge来关联他们：

base.js:
```
/*
 * @Author: leo 
 * @Date: 2018-08-28 11:50:44 
 * @Last Modified by: leo
 * @Last Modified time: 2018-08-30 14:19:15
 * webpack 基础配置文件
 */

const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
// 定义resolve函数便于处理路径
const resolve = (src) => path.resolve(__dirname, '..', src)

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
  ]
} 
```

dev.js
```
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
```

prod.js
```
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
      root: resolve('') // 定义开始清空的目录
    })
  ]
})
```
接下来为修改package.json的命令
```
"build": "webpack --mode production --config build/webpack.config.prod.js",
"dev": "webpack-dev-server --mode development --config build/webpack.config.dev.js"
```
这样最基本的分离工作就完成了，还有些其他的优化在后续会慢慢完善。

#### 我要处理其他文件

上面所有的代码都是围绕js，vue文件展开的。在实际开发中，除了这些之外，我们可能还需要处理JSON文件，图片文件，还有sass less stylus等css预处理文件（代码）等，这就需要webpack丰富的loader来处理了。这一部分可以总结为拓展loader

- 1、处理json文件

如果是低版本（<= 2.0版本），那么处理json文件需要[json-loader](https://www.npmjs.com/package/json-loader)。可以在这里看到：

![json-loader.png](https://upload-images.jianshu.io/upload_images/7140391-0898912c22024d1c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

由于我们这里使用的是webpack4，所以json文件是可以直接处理的

- 2、处理图片文件

对于图片类型的文件，webpack也有对应的url-loader和file-loader两种加载器来处理。这两种loader具体有何差别呢？

url-loader相对于是file-loader的一个上层封装，除了处理文件外，还有一个功能是限制大小，对于小于某个大小的特定图片，可以转换为Base64来减少请求。

```
// 安装依赖
npm i url-loader file-loader --save-dev // url-loader 依赖于file-loader

// loader 配置
 {
  test: /\.(png|jpg|gif)$/, // 匹配png，jpg，gif这三类图片
  loader: 'url-loader?limit=8192' // 限制大小小于8192b的图片会转为base64（经查阅，8192b作为分割较好）
 }
```
为了测试效果，我准备了100kb和5kb左右两张图片

```
<div class="icon">
      <img src="./assets/star.png" alt="" srcset="" width="200" height="200"> <!-- 100kb -->
      <img src="./assets/cz.png" alt="" width="100" height="100"><!-- 5kb -->
</div>
```

，启动dev后显示效果：

![url-loader.png](https://upload-images.jianshu.io/upload_images/7140391-70fe13d1ef131514.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

通过控制台可以看到其代码：
![console.png](https://upload-images.jianshu.io/upload_images/7140391-9245620e820e8238.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

build测试：
![build5.png](https://upload-images.jianshu.io/upload_images/7140391-82632b58e24cc6e3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

可以看到，只打包出100kb那张图片，而5kb的图片则被打包到js代码中

![code1.png](https://upload-images.jianshu.io/upload_images/7140391-156314f259a4a195.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

将图片设置为背景属性和上面效果基本一致，不过base64代码会被打包到css代码中。

- 3、更方便的CSS预处理器

主流的CSS预处理器有sass(scss) less stylus，三者功能类似，具体使用哪个就要看个人喜好和




