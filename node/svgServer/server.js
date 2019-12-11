const sharp = require("sharp")
const path = require("path")
const fs = require("fs")

const pngPath = path.resolve(__dirname, "./static/comp_icon")
const jpegPath = path.resolve(__dirname, "./static/jpeg")
const webpPath = path.resolve(__dirname, "./static/webp")

fs.readdir(pngPath, (err, files) => {
  files.forEach(file => {
    sharp(pngPath + `/${file}`)
      .webp()
      .toFile(webpPath + `/${file.replace(".png", ".webp")}`)
      .then(info => {
        console.log(info)
      })
      .catch(err => {
        throw err
      })
  })
})