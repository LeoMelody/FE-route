const http = require('http')
const fs = require('fs')

http.createServer((req, res) => {
  // console.log('req', req.url)
  if (req.url === '/') {
    console.log(req.headers['user-agent'])
    const html = fs.readFileSync('../view/index.html', 'utf-8') // 这里必须要设置读取的格式为utf-8，是因为如果不设置读取格式，readFileSync方法会读取文件的二进制流数据
    // const html = fs.readFileSync('../view/jsonp.html', 'utf-8') 
    res.writeHead(200, {
      'Content-Type': 'text/html', // 声明内容类型为html格式
      'Cache-Control': 'max-age=20',
      'Set-Cookie': 'test=123'
    })
    res.end(html)
  }

  if (req.url === '/script.js') {
    let etag = req.headers['if-none-match']
    if (etag === '54321') { // 这里先写死测试数据签名54321
      res.writeHead(304, {
        'Content-Type': 'text/javascript',
        'Cache-Control': 'max-age=20000, no-cache',
        'Last-Modified': '123456',
        'Etag': '54321'
      })

      res.end('')
    } else {
      res.writeHead(200, {
        'Content-Type': 'text/javascript',
        'Cache-Control': 'max-age=20000, no-cache',
        'Last-Modified': '123456',
        'Etag': '54321'
      })

      res.end('console.log("hello world")')
    }
  }

  if (req.url === '/no-store.js') {
    let etag = req.headers['if-none-match']
    // console.log(req.headers)
    // console.log('etag = ', etag)
    if (etag === '54321') { // 这里先写死测试数据签名54321
      res.writeHead(304, {
        'Content-Type': 'text/javascript',
        'Cache-Control': 'max-age=20000, no-store',
        'Last-Modified': '123456',
        'Etag': '54321'
      })
      // console.log('use 304')
      res.end('')
    } else {
      res.writeHead(200, {
        'Content-Type': 'text/javascript',
        'Cache-Control': 'max-age=20000, no-store',
        'Last-Modified': '123456',
        'Etag': '54321'
      })

      res.end('console.log("no store")')
    }
  }

  if (req.url === '/api/test') {
    res.writeHead(200, {
      'Content-Type': 'application/json'
    })

    res.end(JSON.stringify({test: '123'}))
  }
}).listen(3001)