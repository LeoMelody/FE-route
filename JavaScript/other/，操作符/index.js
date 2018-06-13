/**
 * @author wangyiheng
 * Create Time : 2018-06-12-15-00
 * Description :
 */

var arr = ['aaa', "aa'", 'aa"']

// console.log('aa\'' === "aa'")

var str = "aa'"

var reg = /\'.*$/

console.log(str.match(reg))

function test(str1, str2) {
    console.log(str1 + str2)
}

test(str, str)