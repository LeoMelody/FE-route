// 如何对一个数组进行随机排序
var arr = [1,2,3,4,5,6,7,8]

// 方案1

var copyArr1 = arr.sort(()=>{
    return Math.random()>0.5
})

console.log(copyArr1)

// 弊端，随机性不强，123还是很大概率在前面， 678 很大概率在最后面。不过在实现普通随机的情况下，这个很是足够了