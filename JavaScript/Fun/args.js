/*
 * @Author: leo 
 * @Date: 2018-10-31 16:15:54 
 * @Last Modified by: leo
 * @Last Modified time: 2018-10-31 16:25:53
 * ES6参数问题
 */

function args(first = second, second) {
  return first + second
}

// args(undefined, 's') // 这个的错误就好比下面这段代码

// let a = b // b 是undefined 因为let不存在变量提升，此处会抱b is notdefined
// let b = 1 

/**
 * 仿造underscore的pick函数
 * @returns obj 返回输入对象特定的属性子集副本
 */
function pick(obj) {
  let result = Object.create(null)
  for (let i = 1, leng = arguments.length;i < leng; i++) {
    result[arguments[i]] = obj[arguments[i]]
  }

  return result
}

let data = {
  name: 'wyh',
  age: '18',
  id: 123123123
}

let tmpData = pick(data, 'name', 'age')

// console.log(tmpData)

// 剩余参数