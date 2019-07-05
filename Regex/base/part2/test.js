/*
 * @Author: leo 
 * @Date: 2019-07-05 15:56:26 
 * @Last Modified by: leo
 * @Last Modified time: 2019-07-05 22:42:10
 * 位置理解案例
 */

// 案例1、写一个匹配不到任何东西的正则
let reg = /.^/g // 开始位置前面还有东西必然是不可能滴
console.log(reg.test('hello'))

// 12345678 => 12,345,678
let money = '12345678'
reg = /(?=\d{3}$)/g // 生成最后一个,
reg = /(?=(\d{3})+$)/g // 将d{3} 分成组即可，这样就可以从后往前去匹配了
console.log(money.replace(reg, ','))
// 那如果是 123,456,78呢？
reg = /\d{3}/g
console.log(money.replace(reg, function(match) {
  return match + ','
})) // em....

money = '12345678 123456789' // 需要把$换成单词边界 在前端位置需要不是单词边界才能加上,
reg = /\B(?=(\d{3})+\b)/g 
console.log(money.replace(reg, ','))

// 再严格点  1280000 => ¥ 1,082,000.00
let m = '1280000'
let mg = /\B(?=(\d{3})+\b)/g
m = Number(m).toFixed(2).replace(mg, ',').replace(/^/g, '¥ ')
console.log(m)

// 案例2、密码校验
// 条件1 6-12位
let passReg = /^\w{6,12}$/g
// 条件2 大小写字母，数字
passReg = /^[a-zA-Z0-9]{6,12}$/g

let upWordsReg = /[A-Z]/g
let lowerWordsReg = /[a-z]/g
let numWordsReg = /\d/g

let pass = 'wyhabc1a'
// 条件3 必须包含条件2中的两种字符 首先这个我们先用分解的形式就会和easy
if (passReg.test(pass)&&((+upWordsReg.test(pass)+lowerWordsReg.test(pass)+numWordsReg.test(pass)) >= 2)) {
  console.log('密码通过')
} else {
  console.log('密码不通过')
}

// 终极考察，能不能用一个正则搞定
// /^[a-zA-Z0-9]{6,12}$/g 尝试改造这个正则，让其变成能检测出包含某一种类型的字符
// 这里就需要用到正向先行断言 这里就用到位置的概念了 ^ 代表的是开始的位置，所以这个正则要想生效，
// ?= 这个断言生效的位置就必须在 ^ 开始之前，也就是也是 ^ 
passReg = /(?=[a-zA-Z0-9]*[a-z])^[a-zA-Z0-9]{6,12}$/g // 这个正则的含义就是，除了匹配6-12个上面规定的字符外
// 开始的位置后面还需要跟上人一个[a-zA-Z0-9]以及一个小写字母，这个是为了匹配小写字母，可以来尝试一下
console.log(passReg.test('abcdef')) // true

// 那同理可以加上数字
passReg = /(?=[a-zA-Z0-9]*[a-z])(?=[a-zA-Z0-9]*[0-9])^[a-zA-Z0-9]{6,12}$/g 
// 这个正则就规定了这个密码必须满足 小写字母和数字这两项校验才可以
// test
console.log(passReg.test('Abcdef123'))

console.log('_________________')
// OK，有了这个思路，完成最终的校验就easy多了
passReg = /((?=[a-zA-Z0-9]*[a-z])(?=[a-zA-Z0-9]*[0-9])|(?=[a-zA-Z0-9]*[A-Z])(?=[a-zA-Z0-9]*[0-9])|(?=[a-zA-Z0-9]*[a-z])(?=[a-zA-Z0-9]*[A-Z]))^[a-zA-Z0-9]{6,12}$/g
console.log(passReg.test('abc123')) // true 因为test方法会修改 reg内部的lastIndex属性，所以验证的时候要一条一条验证
// console.log(passReg.test('Abc123')) // true
// console.log(passReg.test('abcefg')) // false
// console.log(passReg.test('ABC123')) // true
// console.log(passReg.test('1aA')) // false

// 换种思维，既然是三种里面的两种，那也就意思是不能全部是一种，没错，我 负向先行断言出马了
passReg = /(?![0-9]{6,12}$)/g // 匹配不全是数字
// res
passReg = /((?![0-9]{6,12}$)(?![a-z]{6,12}$)(?![A-Z]{6,12}$))^[a-zA-Z0-9]d{6,12}$/g