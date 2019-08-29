/*
 * @Author: leowangheng@tencent.com 
 * @Date: 2019-08-29 10:14:55 
 * @Last Modified by: leo
 * @Last Modified time: 2019-08-29 10:40:20
 */

class SimplePromise {
  constructor(exec) {
    // init val
    this.__status__ = "pending"
    this.__val__ = undefined
    this.__reason__ = undefined
    this.fulfilledCalls = []
    this.rejectCalls = []
    
    let that = this
    function resolve(val) {
      // 1、这里要理解为什么要有这一行
      if (that.__status__ !== 'pending') return
      // 2、这里要理解为何使用setTimeout，
      // 3、真正的promise是否是用这种方式实现的？如果不是，那么会是以一种什么方式实现的？
      setTimeout(() => {
        that.__val__ = val
        that.__status__ = 'fulfilled'
        // 4、这里理解这个为什么要遍历。或者说为什么要用一个calls而不是单独的一个callback来存储？
        that.fulfilledCalls.forEach(fn => {
          fn && fn(val)
        });
      })
    }

    function reject() {
      // 基本同resolve，就不写了
    }

    try {
      exec(resolve, reject)
    } catch (err) {
      reject(err)
    }
  }

  then(resolveFn, rejectFn) {
    // 5、理解这两行代码。在then方法里什么参数都没有或者传入一些奇奇怪怪的东西的时候，promise会做哪些操作？
    resolveFn = typeof resolveFn === 'function' ? resolveFn : value => value
    rejectFn = typeof rejectFn === 'function' ? rejectFn : reason => reason

    // 6、为什么此时还需要再判断一次当前的status？分别对应的哪些情况。这个属于自己的一些理解
    if (this.__status__ === 'pending') {
      return new SimplePromise((resolve, reject) => {
        // 这两行是核心的代码，也算是一个简单的事件模型
        // 这样写是跑不过大部分的promise test的，主要原因是resolveFn的返回值是要作为当前这个promise的内部值的，这里无法体现
        this.fulfilledCalls.push(resolveFn)
        this.rejectCalls.push(rejectFn)
      })
    } else if (this.__status__ === 'fulfilled') {
      // 7、这种情况产出的情景分析。写出demo来
      return new SimplePromise((resolve, reject) => {
        resolveFn(this.__val__)
      })
    } else if (this.__status__ === 'rejected') {
      // 基本同fulfilled，不写了
    }
  }
}


// 综上就是最简单最基本功能的一个promise，如下代码正常运行

let sp = new SimplePromise((resolve, rejeect) => {
  setTimeout(() => {
    resolve(123)
  }, 2000)
}).then(val => {
  console.log(val)
})

// 你那个代码的我看了下， 在then中的pending处理有一些问题，你自己看看