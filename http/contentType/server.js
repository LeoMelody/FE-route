const http = require('http')
const zlib = require('zlib')
const fs = require('fs')
var bodyParser = require('body-parser')
const express = require('express')
const app = express()
const multipart = require('connect-multiparty')
const multipartMiddleWare = multipart()
app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: false }))


app.get('/', (req,res) => {
  const html = fs.readFileSync('./index.html')
  res.writeHead(200, {
    'Content-Type': 'text/html', // 这里 text 表示响应数据的主类型（文本类型） html 表示一个详细的描述，告诉客户端，这是个html格式的文本类型
    'Content-Encoding': 'gzip' // 设定编码格式为gzip类型，这样，浏览器就会对数据进行响应的解码操作
  })
  res.end(zlib.gzipSync(html))
})

app.post('/form', multipartMiddleWare, function(req, res) {
  console.log(req.body)
  console.log(req.files)
  res.send({
    test: '123'
  })
})

const server = app.listen(3231, function() {
  console.log('server start')  
})