/*
 * @Author: leo 
 * @Date: 2019-07-04 18:13:54 
 * @Last Modified by: leo
 * @Last Modified time: 2019-07-05 10:24:01
 * 正则表达式 第二节 -- 量词以及量词带来的贪婪与懒惰
 * 1、量词 {} 上节横向匹配中有接触到，这节细说。 
 * 五种量词 {m,}至少出现m次， {m,n}出现m～n次 ? 等价于{0,1} +等价于{1,} *等价于{0,}
 * 2、贪婪与懒惰
 */

 // 1、使用量词来设定匹配内容
let str = '11ss2ds1234jzz'
// 匹配连续的四个数字
let reg = /\d{4}/g
console.log(str.match(reg))
// 匹配连续的数字
// let reg = /\d{1-∞}/
// 又没有无穷这个符号，于是有了/\d{1,}/
reg = /\d{1,}/g 
console.log(str.match(reg))
// 好像有点丑
reg = /\d+/g
console.log(str.match(reg)) // 同上

// 2、贪婪与懒惰 量词的不确定性带来的两种极端体现
// 本性贪婪：greed
let greed = /\d{2,5}/g
let numstr = '123123412'
// 因为本性贪婪，所以会直接尽多的根据量词的范围来匹配，你既然让我选2个到5个，那我就尽多的匹配
console.log(numstr.match(greed)) // [ '12312', '3412' ]

// 与这种贪婪相反的懒惰需要我们手动去设置，就像是黑白两面一样。
// 对于量词匹配规则，我们只需要在后面加上? 即可表明这个正则在匹配量词范围时以懒惰的态度（尽少）
let lazy = /\d{2,5}?/g
console.log(numstr.match(lazy)) // [ '12', '31', '23', '41' ] 能匹配到两个我是不会再去匹配更多的
// 同理，下面这些都是贪婪的模式
greed = /\d*/g
console.log(numstr.match(greed)) // [ '123123412', '' ]
greed = /\d+/g
console.log(numstr.match(greed)) // [ '123123412']
greed = /\d?/g
console.log(numstr.match(greed)) // [ '1', '2', '3', '1', '2', '3', '4', '1', '2', '' ]
greed = /\d{1,}/g
console.log(numstr.match(greed)) // [ '123123412']

// 在加上? 后就会呈现懒惰的姿态
// 那么思考🤔 把它们都换成懒惰打印出来的结果是什么
lazy = /\d*?/g // 
console.log(numstr.match(lazy)) // 尽量少 ['','','','','','','','','',''] 10位，因为最后数字完了以后，也能匹配到空
lazy = /\d+?/g // [ '1', '2', '3', '1', '2', '3', '4', '1', '2']
lazy = /\d??/g // 同 *?
lazy = /\d{1,}?/g // 同 +?

// 这节相当于是对lesson1中横向匹配规则的一个详细补充