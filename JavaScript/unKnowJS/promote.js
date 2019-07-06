/*
 * @Author: leo 
 * @Date: 2019-07-06 15:34:34 
 * @Last Modified by: leo
 * @Last Modified time: 2019-07-06 15:37:52
 * 变量/函数 提升练习
 */

console.log(a) // undefined
var a = 2 

// console.log(b) // RefrenceError 
let b = 3


if (true) {
  // console.log(c) // RefrenceError
  let c = 1 
}

// console.log(c) // RefrenceError