/*
 * @Author: leo 
 * @Date: 2019-08-07 10:40:35 
 * @Last Modified by: leo
 * @Last Modified time: 2019-08-07 19:13:33
 * function生成简易理解
 */
function _c(str) {console.log(str); return 'hello' + str}

function generate() {
  return {
    render: `_c('div')`
  }
}

const compile = generate()

function createFunc(code) {
  return new Function(code)
}

const render = createFunc(`return ${compile.render}`)

console.log(render())