const http = require('http')
const fs = require('fs')

http.createServer((req, res) => {
  console.log('req', req.url)

  const html = fs.readFileSync('../view/index.html', 'utf-8') // 这里必须要设置读取的格式为utf-8，是因为如果不设置读取格式，readFileSync方法会读取文件的二进制流数据
  res.writeHead(200, {
    'Content-Type': 'text/html' // 声明内容类型为html格式
  })
  res.end(html)
}).listen(3001)