/*
 * @Author: wangyiheng 
 * @Date: 2018-06-21 15:48:03 
 * @Last Modified by: wangyiheng
 * @Last Modified time: 2018-06-21 16:14:26
 * 学习函数作为一等公民的存在
 */
// var hi = (name)=> 'hi' + name
// var greeting = (name)=> hi(name)
// console.log(greeting('wyh')) // 和运行 hi('wyh') 一模一样，这个包裹起来的方法有什么用呢

// 更别扭的写法

var greeting = (name)=>(name)=> 'hi' + name

var greeting = function(name) {
    return function(name) {
        console.log('hi', name)
    }
}

greeting('wyh')('wyh')