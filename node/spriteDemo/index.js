const gm = require("gm");
const fs = require("fs")
const path = require("path")

const json = {}
let start = 0
function main(filePath) {
  const basePath = path.resolve(__dirname, filePath)
  const data = fs.readdirSync(basePath)
  if (!data.length) throw new Error("no imgs")
  let first = data[0]
  gm(path.resolve(basePath, first)).append(...data.slice(1).map(file => {
    let fp = path.resolve(basePath, file)
    console.log(fp)
    gm(fp).size((err, size) => {
      console.log(fp, size)
    })
    return fp
  }), true).toBuffer((err, buffer) => {
    fs.writeFileSync(path.resolve(__dirname, "output/main.png"), buffer, {
      encoding: "binary"
    })
  })
}

main("./img")