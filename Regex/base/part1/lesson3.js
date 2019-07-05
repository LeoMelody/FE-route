/*
 * @Author: leo 
 * @Date: 2019-07-04 19:45:58 
 * @Last Modified by: leo
 * @Last Modified time: 2019-07-05 10:00:03
 * 正则表达式 第三节 -- 分支
 */

 // 在lesson1中有说过字符组 
let part = /[abc]abc/g
let str = 'aabc' // 不管是 aabc babc cabc均可以通过匹配
console.log(part.test(str))

// 那么可不可以将匹配规则统计成一个匹配规则组，只要字符串通过这里面的任意一个匹配规则即可
part = /aabc|babc|cabc/g // | 可以将一段段匹配规则拼接起来形成一个匹配规则组我们称其为分支
console.log(str.match(part)) // 匹配成功

// 分支是懒惰的还是？  因为会有多个匹配规则，就像用for语句在挨个test哪个能成功一样，
// 个人认为如果前面的匹配规则通过的话就不会再去跑后面的匹配规则了
str = 'aabcabc' // 如果是懒惰的，则match结果是['aabc']否则是 ['cabc']或者其他
console.log(str.match(part))

// 分支的合并同类项？
// 我们都学过合并同类项，看着aabc babc cabc 中相同的abc实在是难受,能不能这样写呢?
part = /(a|b|c)abc/g
console.log(str.match(part)) // 同上
