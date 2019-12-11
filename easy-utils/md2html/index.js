/*
 * @Author: leowangheng@tencent.com 
 * @Date: 2019-11-20 10:01:40 
 * @Last Modified by: leo
 * @Last Modified time: 2019-11-20 10:36:32
 * md 转 html 
 */

const path = require("path")
const fs = require("fs")
const md = require("marked")

const prefixHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>

`

const appendHtml = `
  
</body>
</html>
`
/**
 * 主方法
 */
;(function main() {
  const dirPath = path.resolve("/Users/leohengwang/Desktop/vuecomponent")
  fs.readdir(dirPath, (err, files) => {
    if (err) throw err;
    // 读取到所有的文件
    if (!fs.existsSync(path.join(dirPath, "htmls"))) {
      console.log("?")
      fs.mkdirSync(path.join(dirPath, "htmls"))
    }
    files.forEach(file => {
      let filePath = path.join(dirPath, file)
      fs.readFile(filePath, "utf-8", (err, data) => {
        // data为mdcontent
        var html = `${prefixHtml}
          ${md(data)}
        ${appendHtml}`
        // 写入html
        
        fs.writeFile(path.join(dirPath, "htmls", file.replace(/.md/, ".html")), html, (err, data) => {
          
        })
      })
    })
  })
})();