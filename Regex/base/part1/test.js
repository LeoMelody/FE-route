/*
 * @Author: leo 
 * @Date: 2019-07-04 19:59:07 
 * @Last Modified by: leo
 * @Last Modified time: 2019-07-05 10:17:49
 * 案例联系
 */

 // 1、匹配16进制的颜色值 场景分析，在input框内输入色值，如果输入正确，则在测试框内显示这个颜色，否则提示
 (function() {
   const color = document.querySelector('#color')
   const son = document.querySelector('#demo1>.son')
   // 分析正则 16进制色值就是0～9 a-f(A-F) 然后重复3次或者6次（其他次数不行） #开头
   // 先把6放到前面是为了防止惰性匹配 #123456 --> #123
   var reg = /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/g
   color.addEventListener('keyup', function(e) {
      // 这里还有个小插曲，因为reg在JS中是引用类型，而每次reg调用test方法都会修改它内部的lastIndex属性
      // 所以我们在开发中一定要注意这个问题
      if (e.keyCode === 13) { // 13代表回车
        let val = color.value
        let m = val.match(reg)
        if (m && m.length) {
          son.style.backgroundColor = val
        } else {
          console.log('请输入正确的色值')
        }
      }
   })
 })();

 // 上面正则出现的问题：

 // 如果我输入的是 123#123这样的，就匹配也是通过，然而这个并非正确的色值
 // 这里就要用到两个新的东西 ^ $ 开始符号和结束符号

 // 2、匹配时间 小明和小红约会定个时间，为了防止小明输入错误，请帮他写个正则
(function() {
  // 分析 时间构成 20:00 第一个是 0-2 第二个有些特殊 第三个是 : 第四个是 0-5 第五个是 0-9
  // 第二个当第一个是0/1的时候 是 0-9 当第一个是2的时候是0-3
  var reg = /^([01][0-9]|2[0-3]):[0-6][0-9]$/g
  const time = document.querySelector('#time')
  time.addEventListener('keyup', function(e) {
    // 这里还有个小插曲，因为reg在JS中是引用类型，而每次reg调用test方法都会修改它内部的lastIndex属性
    // 所以我们在开发中一定要注意这个问题
    if (e.keyCode === 13) { // 13代表回车
      let val = time.value
      let m = val.match(reg)
      if (m && m.length) {
        console.log('约会成功')
      } else {
        console.log('没有诚意，不和你约了')
      }
    }
 })
})();

// 案例3、匹配日期 1900 ~ 2100 年之间
// 就不写html了
let dateReg = /^((19|20)\d{2}|2100)-(0\d{1}|1[0-2])-(0[1-9]|[12]\d{1}|3[01])$/g
console.log(dateReg.test('2020-11-11'))
// 更复杂的比如当月份天数为28、29、30、31天的控制就太难了

// 案例4、匹配文件路径 模式 盘符:\文件夹\文件夹.....
// 新知识点，由于\在正则中有实际的意义，所以要想匹配\需要用\来将它转义一下
// 文件名称除了\w的内容外，可能还有-*#@等等
// 这里有一份文件夹命名规则的正则 [^\\:*<>|"?\r\n/]
let fileReg = /^[a-zA-Z]:\\([^\\:*<>|"?\r\n/]+\\)*([^\\:*<>|"?\r\n/]+)?$/g

// 案例5、终于到实际的用处了。匹配html中的某个属性： 
// 我们假设自己是Vue的developer 尤大让写一个匹配到 v-if="xxx" 属性的正则
let htmlStr = '<div v-if="showValue" class="d"/>'
// "<div v-if=showValue' class='d'/>" 着两个都可以
// 这还不简单，v-if="开头 中间任意个字符 "结尾，so easy
let htmlReg = /v-if=".*"/g // 这里其实还可能是 ' '所以需要写两种
htmlReg = /v-if=(".*"|'.*')/g
console.log(htmlStr.match(htmlReg)) // ['v-if="showValue" class="d"']
// 由于贪婪匹配的原因，使得这个正则匹配到了很多，那我们让它惰性一下,只需要让""引号中间匹配到的字符尽量少即可
htmlReg = /v-if=(".*?"|'.*?')/g
console.log(htmlStr.match(htmlReg)) // ['v-if="showValue"']

// 但是上述的方案并非是一个很好的解决方案，因为回溯的概念（后续会有）会导致这个正则匹配方案是一个匹配效率很低的方案

// 优化方案
htmlReg = /v-if="[^"]*"/g // 匹配非"的任意个字符 缺点，除了" 外还可能有其他奇奇怪怪的字符也需要我们去排除掉