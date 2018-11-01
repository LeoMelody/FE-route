/*
 * @Author: wangyiheng 
 * @Date: 2018-06-21 10:50:54 
 * @Last Modified by: leo
 * @Last Modified time: 2018-10-31 11:14:29
 * @description  Js great code snippet 1~5
 * 一天学习几个经典的great code 的写法，思想，新的语法等。一定要知其然知其所以然
 */

const arr = [13,5,7,12,8,5,3,1,1]

//1、 找出arr中最大的数字 使用Math.max 结合拓展运算符
var maxNum = Math.max(...arr)
console.log(maxNum) // 13

// 2、 找出arr中最小的数字
console.log('最小的数字是：', Math.min(...arr)) // 1

// 3、将arr分解成固定大小的段数  chunk

function chunk(arr, size) {
    // 这个主要考察的是Array.from 的使用
    // Array.from 接收两个参数  arg1：表示要接收的类数组对象, arg2 对arg1进行操作的方法（v表示当前数组中的值，i表示当前下标）
    return Array.from({length: Math.ceil(arr.length/size)}, (v, i)=> arr.slice(i * size, i * size + size)) // 需要掌握这个Array.from方法
}

// console.log(Array.from({length: 8}))// [undefined, .....] 八个undefined

console.log(chunk(arr, 2))

// 4、从数组中移除false值

const arr2 = ['1', 0, 12, '0', NaN, false, null, undefined, '']
console.log(arr2.filter(Boolean)) // 可以过滤掉所有值可转换为false的值
// console.log(Boolean(NaN)) // false

// 5、计算数组中值出现的次数