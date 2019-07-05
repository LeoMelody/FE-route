/*
 * @Author: leo 
 * @Date: 2019-07-05 11:12:08 
 * @Last Modified by: leo
 * @Last Modified time: 2019-07-05 22:02:18
 * 正则表达式 第一节 --- 认识锚点（位置）
 */

 // 第一个位置 ^ 在多行匹配中匹配行开头  这里一直有一个误区就是^是用来匹配开始位置，这个可以看str2
let reg = /^hello/g // 匹配以hello开头的字符
let reg2 = /^hello/gm // gm表示
let str = 'hello world'
let str2 = `hello world
hello nihao
hello ???`
console.log(str.match(reg)) // ['hello']
console.log(str2.match(reg2)) // [ 'hello', 'hello', 'hello' ]

// 认识新的方法 replace
// test方法用来检测正则是否匹配到内容，match用来获取匹配的内容，replace(常用来匹配位置)用于将匹配到的内容换成指定的内容
// replace 方法用法：包装hello world => #hello world#
str = str.replace(/^|$/g, '#')
console.log(str)

// replace 的第二个参数可接收一个function，适用于比较复杂的场景，这里先不说，先继续学习锚点（位置）

// 第三个位置 单词边界 \b，所谓的单词边界也就是每一个单词的左右两边，配合例子来理解：
str = 'hello world您好！ 世界123[sss]'
str = str.replace(/\b/g, '*')
console.log(str)// *hello* *world*您好！ 世界*123* 
// 可以看到\b是只对英文和数字有效的。每一个英文单词（数字）的左右两边可以被成为它的单词边界

// 第四个位置 非单词边界 \B 
str = 'hello world您好！ 世界123[sss]'
str = str.replace(/\B/g, '*') 
console.log(str) // h*e*l*l*o w*o*r*l*d您*好*！* *世*界1*2*3[s*s*s]* 
// 可以看到，一个单词左右两边是\b,内部的字符之间是\B

// 第五个位置，断言。   要我说的话，从part1到现在，终于有一个较为难掌握的知识点出现了
// (?=p) 到这里再提醒一下自己。这里学习的都是位置
// 所以这个的意思就是匹配到p前面的位置，也就是这个位置后面的内容都要匹配p才行
// 这个东西的学名叫做 正向先行断言 
let p = 'xxx world xxx s world' // 在所有的world前面都加上hello
p = p.replace(/(?=world)/g, 'hello ') // 断言要用() 包住
console.log(p) // xxx hello world xxx s hello world
// 12345678 => 12,345,678
let money = '12345678'
money = money.replace(/(?=\d{3})/g, ',')
console.log(money) // ,1,2,3,4,5,678 为什么会这样？  这是因为在匹配的时候它没想象的那么智能
// 12345678 => ,12345678 => ,1,2345678 .... ,1,2,3,4,5,678
// 后面会解决这个题

// 第六个位置 (?!p) 这个正好和第五个相反，匹配不到p的前面的位置 学名是负向先行断言
p = 'xxxhlx'
p = p.replace(/(?!x)/g, ',') // 如果后面不是x，那么就在后面加一个
console.log(p) // xxx,h,lx,

// ES6新增 ?<=p  ?<!p 这俩我还没整明白

// 更方便的位置的理解 位置就是"" 空字符，啥都没有，所以hello用 /(?=\w)/g 就能匹配到五个地方
console.log('hello'.replace(/(?=\w)/g, '.')) // .h.e.l.l.o

// 12345678看test