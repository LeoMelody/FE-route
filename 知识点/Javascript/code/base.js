/*
 * @Author: leo 
 * @Date: 2019-07-12 00:48:50 
 * @Last Modified by: leo
 * @Last Modified time: 2019-07-12 01:05:23
 * 基础知识点代码
 */

 // 1、用instanceof 来判断基础类型，因为instanceof关键字的右侧只能是Function类型，
 // 所以需要我们自己手写几个类来间接地实现 instanceof 判断 基础类型的效果

 // 自定义一个用于判断字符串的构造函数
class PrimitiveString {
  static [Symbol.hasInstance](x) {
    return typeof x === 'string'
  }
}

class PrimitiveNumber {
  static [Symbol.hasInstance](x) {
    return typeof x === 'number'
  }
}

class PrimitiveBoolean {
  static [Symbol.hasInstance](x) {
    return typeof x === 'boolean'
  }
}

class PrimitiveUndefined {
  static [Symbol.hasInstance](x) {
    return typeof x === 'undefined'
  }
}

class PrimitiveNull {
  static [Symbol.hasInstance](x) {
    return x === null
  }
}

class PrimitiveSymbol {
  static [Symbol.hasInstance](x) {
    return typeof x === 'symbol'
  }
}

console.log('' instanceof PrimitiveString)
console.log(123 instanceof PrimitiveNumber)
console.log(true instanceof PrimitiveBoolean)
console.log(Symbol(1) instanceof PrimitiveSymbol)
console.log(null instanceof PrimitiveNull)
console.log(undefined instanceof PrimitiveUndefined)

// 2、 Object.prototype.toString.call(val) 的用法
console.log(Object.prototype.toString.call('hello world')) 
// 知名符号 toStringTag 的用法
PrimitiveString.prototype[Symbol.toStringTag] = 'PrimitiveString'
console.log(Object.prototype.toString.call(new PrimitiveString())) 

