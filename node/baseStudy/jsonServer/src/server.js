/*
 * @Author: leowangheng@tencent.com 
 * @Date: 2019-12-14 15:01:56 
 * @Last Modified by: leo
 * @Last Modified time: 2019-12-14 15:34:52
 * 一个简单的nodejs http 服务器
 */

const http = require("http") // 这里补充疑问，https 和 http2这两个模块怎么用？

http.createServer((req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/plain"
  })
  res.end("hello world")
}).listen(8000)
// 通过curl命令来查看信息 curl -i 可以查看某个http请求的响应头信息
//  -i, --include       Include protocol response headers in the output