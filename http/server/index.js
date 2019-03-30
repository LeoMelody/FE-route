const http = require('http')

http.createServer((request,response) => {
  console.log('request', request.url)
  /**
   * 解决跨域
   */
  // response.writeHead(200, {
  //   "Access-Control-Allow-Origin": "*"
  // })
  // 更好地设置权限,设置
  response.writeHead(200, {
    // 这能设置一个值
    "Access-Control-Allow-Origin": "http://localhost:3001"
  })
  response.end('123') // 成功接收到请求
}).listen(3000)