/*
 * @Author: wangyiheng 
 * @Date: 2018-06-21 15:04:45 
 * @Last Modified by: leo
 * @Last Modified time: 2019-06-30 10:15:10
 * 从一些简单的例子入手来认知函数式编程
 */
/**
 * 创建海鸥群
 * @param {*} n 海鸥的数量 
 */
var Flock = function(n) {
    this.seagulls = n
}

/**
 * 加入海鸥群
 * @param {*} other 其他海鸥群 
 */
Flock.prototype.conjoin = function(other) {
    this.seagulls += other.seagulls
    return this //??
}

/**
 * 繁殖 这个其实有点扯不过凑合着先用
 * @param {} other 隔壁老王的海鸥群
 */
Flock.prototype.breed = function(other) {
    this.seagulls = this.seagulls * other.seagulls
    return this
}

var flock_a = new Flock(4)
var flock_b = new Flock(2)
var flock_c = new Flock(0)

var result = flock_a.conjoin(flock_c).breed(flock_b).conjoin(flock_a.breed(flock_b)).seagulls
console.log(result) // 32?  在第一次breed(flock_b) 后，this.seagulls变为了8  然后执行第二个bread，this.seagulls 变为16  然后就是16+16 变为32
// 很明显这不是我们希望的

// 修改conjoin和breed这两个方法

const conjoin = (flock_x, flock_y)=> flock_x + flock_y
const breed = (flock_x, flock_y)=> flock_x * flock_y
flock_a = 4
flock_b = 2
flock_c = 0
console.log(conjoin(breed(flock_a, flock_b), breed(conjoin(flock_a,flock_c), flock_b))) // 满足了我们的需求
// 问题： 这尼玛代码也太鸡儿长了吧
// 其实根据初中的数学知识，上面的这个东西可以变换成 。。。。 合并同类项。。。
console.log(breed(conjoin(flock_a, flock_a, flock_c), flock_b))