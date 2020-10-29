/*
 * @Author: leo 
 * @Date: 2018-10-31 09:43:15 
 * @Last Modified by: leo
 * @Last Modified time: 2020-09-04 11:26:20
 * @description ES6～ 新增的String的API
 */

 /**
  * repeat方法测试
  * repeat方法，字符串可调用改方法，接受一个参数表示这个字符串重复的次数，返回该字符串重复指定次数的新字符串
  */
function repeatIn(str = '', num = 0) {
  return str.repeat(num)
}

// console.log(repeatIn('wyh', 6))

/**
 * 模板字符串与标签配合使用
 */

let age = 18, name = 'wyh', str = tag`wo shi ${name} wo jinian ${age}`

/**
 * 标签标示一个方法
 */
function tag(literals, ...args) {
  console.log(literals) // arr [ 'wo shi ', ' wo jinian ', '' ]
  console.log(args) // arr [ 'wyh', 18 ]
}
