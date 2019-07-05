/*
 * @Author: leo 
 * @Date: 2019-07-04 14:22:02 
 * @Last Modified by: leo
 * @Last Modified time: 2019-07-05 09:58:22
 * 正则表达式 第一节 -- 什么是正则表达式
 * 知识点： 
 * 1、正则表达式就是匹配模式，匹配字符或者匹配位置
 * 2、横向匹配模式与纵向匹配模式的理解 {} 定义重复次数 与 [] 定义分组
 * 3、元字符，反义
 * 掌握了这些知识点，我已经可以进行一些简单的匹配工作了 
 */

 // 1、 普通的模糊匹配
let reg = /hello/
console.log(reg.test('hello world')) 

// 正则表达式的修饰符 g i  g的话就表示全局匹配，就会匹配所有满足当前正则的部分
// 2、横向匹配模式demo
reg = /ab{2,4}/g // 这里有一个新东西 {} 用来表示重复次数这里表示2～4次
console.log('abbb hello abb world cabbbb'.match(reg)) 

// 3、纵向匹配模式demo
reg = /[abc]b/g // 这里有个新东西 [] 这个叫字符组，可以匹配这个字符组中的任意一个
console.log('ab bb cc cb'.match(reg)) // [ 'ab', 'bb', 'cb' ]
// 对于数字而言的字符组
reg = /[3-8]b/g // [3-8]就代表了 [345678]
console.log('ab 4b 3b 8b 9b'.match(reg)) // [ '3b', '8b' ]
// 同样，对于字母也会有这样的规律
reg = /[c-m]b/g
console.log('abcbgbkbxb'.match(reg)) // [ 'cb', 'gb', 'kb' ]

// 4、认识元字符 
// 小A想要匹配字符串中的数字
let str = '0abcns1m239 lkh_.;&^()aSs'
reg = /[0-9]/g // 像这种有特定含义的，为了方便我们的使用，就创造出了元字符这种东西
console.log(str.match(reg))
reg = /\d/g // digit 搞前端的像type = digit这种一定见过的（数字键盘）
console.log(str.match(reg)) // 效果同上
// 小B想要匹配字母
reg = /[a-zA-Z]/g // 抱歉字母没有数字特殊
// 小C想要匹配所有的单词字符
reg = /[a-zA-Z0-9_]/g
// 等同于
reg = /\w/g // w表示word，在正则表达式中，word表示字母，数字和下划线
console.log(str.match(reg))

// 除此之外，还有 \s 表示 space 也就是空白符（空格，tab， 换行，回车等）
// . 表示通配符，几乎任意字符。除了换行，回车，行分割，段分割符

// 新的需求
// 匹配下方数字字符串中不是5的数字
let nums = '1285679'
reg = /[0-46789]/g // ....这也太笨了
// 在分组中加入 ^ 表示非的效果
reg = /[^5]/g
console.log(nums.match(reg))
nums += 'x'
console.log(nums.match(reg)) // x也出现了
// 大写字母元字符
// \D表示非数字 那下面这个就表达的含义是 非5非非数字的组合，即除5外的其他数字 （常用）
reg = /[^5\D]/g
console.log(nums.match(reg)) // 
// 其他的大写字母元字符 \W 表示非单词字符 \S 表示非空白符（基本就是所有的字符了）

// 小X是个奇怪的孩子，它想要匹配所有
reg = /[\d\D]/g // 非数字 + 数字 = all   //同理 [\w\W] [\s\S] [^] 均可匹配所有