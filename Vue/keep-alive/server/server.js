const http = require('http')

http.createServer(function(req, res) {
  res.writeHead(200, {
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": "*" // 设置允许跨域
  })
  // 模拟返回数据
  res.end(JSON.stringify([
    {
      name: '1'
    },
    {
      name: '2'
    },
    {
      name: '3'
    },
    {
      name: '4'
    },
    {
      name: '5'
    },
    {
      name: '6'
    }
  ]))
}).listen(3000)