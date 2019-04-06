const http = require('http')
const fs = require('fs')

http.createServer((req, res) => {
  console.log('req', req.url)
  if (req.url === '/') {
    const html = fs.readFileSync('./index.html', 'utf-8') 
    res.writeHead(200, {
      'Content-Type': 'text/html', // 声明内容类型为html格式
      'Set-Cookie': 'id=123'
    })
    res.end(html)
  }
}).listen(8081)