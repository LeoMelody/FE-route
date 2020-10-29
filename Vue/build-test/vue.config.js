
var config = {
  outputDir: process.env.NODE_ENV === "test" ? "dist-test" : "dist"
}

module.exports = config;