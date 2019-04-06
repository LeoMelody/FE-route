/*
 * @Author: leo 
 * @Date: 2019-04-06 12:10:11 
 * @Last Modified by: leo
 * @Last Modified time: 2019-04-06 13:32:01
 * 字典服务 用于验证 last-modified的用法
 */

const http = require('http')
const fs = require('fs')

http.createServer(async (req, res) => {
  if (req.url === '/') {
    const html = fs.readFileSync('../view/dic.html', 'utf-8')  
    res.writeHead(200, {
      'Content-Type': 'text/html'
    })

    res.end(html)
  }

  if (req.url === '/api/dic') {
    let modifiedTime = req.headers['if-modified-since']
    const data = await fs.readFileSync('../data/user_type.json', 'utf-8')
    let updateTime = JSON.parse(data).updateTime
    if (modifiedTime === updateTime) {
      res.writeHead(304, {
        'Cache-Control': 'max-age=200000, no-cache',
        'Last-Modified': '123456',
        'Etag': '54321'
      })
      res.end('')
    } else {
      res.writeHead(200, {
        'Cache-Control': 'max-age=200000, no-cache',
        'Last-Modified': '123456',
        'Etag': '54321'
      })
  
      res.end('1234')
    }
    
  }

  if (req.url === '/test.js') {
    let modifiedTime = req.headers['if-modified-since']
    const data = await fs.readFileSync('../data/user_type.json', 'utf-8')
    let updateTime = JSON.parse(data).updateTime
    if (modifiedTime === updateTime) {
      res.writeHead(304, {
        'Content-Type': 'text/javascript',
        'Cache-Control': 'max-age=200000, no-cache',
        'Last-Modified': '123456',
        'Etag': '54321'
      })
      res.end('')
    } else {
      res.writeHead(200, {
        'Content-Type': 'text/javascript',
        'Cache-Control': 'max-age=200000, no-cache',
        'Last-Modified': '123456',
        'Etag': '54321'
      })
  
      res.end('console.log("hello world")')
    }
  }
}).listen(8010)