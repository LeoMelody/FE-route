const ws = require('ws')
const http = require('http')
const fs = require('fs')
const wsServer = ws.Server

// // 创建socket
// const wss = new wsServer({
//   port: 3000
// })

// // 监听连接
// wss.on('connection', function(w) {
//   ws.on('message', function(msg) {

//   })
// })

const server = http.createServer(function(req, res) {
  if (req.url === '/') {
    const html = fs.readFileSync('./index.html', 'utf-8')
    res.writeHead(200, {
      'Content-Type': 'text/html'
    })

    res.end(html)
    return 
  }

  if (req.url.indexOf('/send') > -1) { // 发送评论
    let params = {}
    req.url.replace(/([^?&=]+)=([^&]+)/g,(_,k,v)=>params[k]=v)
    // 提取发送内容
    console.log(params)
    res.writeHead(200, {
      'Content-Type': 'text/plain'
    })

    res.end(JSON.stringify({value: decodeURIComponent(params.value)}))
  }
})

server.listen(3001)