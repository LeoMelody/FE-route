/*
 * @Author: leo 
 * @Date: 2019-07-05 11:12:08 
 * @Last Modified by: leo
 * @Last Modified time: 2019-07-05 11:13:15
 * 正则表达式 第一节 --- 认识锚点（位置）
 */

 // 第一个位置 ^

let reg = /^hello/g // 匹配以hello开头的字符
let str = 'hello world'
console.log(str.match(reg))
