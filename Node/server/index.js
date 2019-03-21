const http = require('http')

http.createServer((request,response) => {
  console.log('request', request.url)
  /**
   * 解决跨域
   */
  response.writeHead(200, {
    "Access-Control-Allow-Origin": "*"
  })
  response.end('res') // 成功接收到请求
}).listen(3000)