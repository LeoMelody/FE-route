// =========================
// 题目：编写一个简单的事件监听处理器，要求具备 on 方法绑定、off 方法解绑
// 编写一个简单的事件监听处理器
// 1. 具备 on 方法绑定事件
// 2. 具备 off 方法解绑事件

// 20.26-20.38

function EventEmitter () {
  this.listenerMap = new Map()
}

EventEmitter.prototype.on = function (type, listener) {
  if(type === '*') { // *我理解为为所有已注册过监听的type都添加一个监听函数
    for(let key of this.listenerMap.keys()) {
      const listenerList = this.listenerMap.get(key) || []
      listenerList.push(listener)
      this.listenerMap.set(key, listenerList)
    }
  } else {
    const listenerList = this.listenerMap.get(type) || []
    listenerList.push(listener)
    this.listenerMap.set(type, listenerList)
  }
}

EventEmitter.prototype.off = function (type, listener) {
  const listenerList = this.listenerMap.get(type)
  if (!listenerList || listenerList.length) return 
  for (let i = 0, l = listenerList.length; i < l; i++ ) {
    if (listenerList[i] === listener) {
      listenerList.splice(i, 1)
      return 
    }
  }
}

EventEmitter.prototype.emit = function (type, ...args) {
  const listenerList = this.listenerMap.get(type) || []
  for(let listener of listenerList) {
    listener.apply(this, args)
  }
}

// test
var emitter = new EventEmitter();

emitter.on('foo', function (e) {
  console.log('foo event: ', e);
});

emitter.on('*', function (e, type) {
  console.log('some event: ', e, type);
});


function onBar (e) {
  console.log('bar event: ', e);
}

emitter.on('bar', onBar);


emitter.emit('foo', { name: 'John' });
emitter.emit('bar', { name: 'John' });

emitter.off('bar', onBar);
emitter.emit('foo', { name: 'John' });
emitter.emit('bar', { name: 'John' });


// =========================
// 题目：请通过代码实现大整数（可能比Number.MAX_VALUE大）相加运算。
// 请通过代码实现大整数（可能比Number.MAX_VALUE大）相加运算
// 20.38-21.54
class BigInt {
  constructor(str) {
    this.strList = []
    for(let item of str) {
      if(isNaN(Number(item))) {
        throw new TypeError(`${str} must be a string consist of number`)
      }
      this.strList.push(item)
    }
    this.length = this.strList.length
  }
  
  plus(bigInt) {
    if(!(bigInt instanceof BigInt)) {
      throw new TypeError(`${bigInt} is not a BigInt`)
    }
    const maxLength = Math.max(this.length, bigInt.length)
    let carry = 0
    let result = ''
    for(let i = maxLength - 1; i >= 0; i--) {
      let sum = (Number(this.strList[i]) || 0) + (Number(bigInt.strList[i]) || 0)
      carry = Math.floor(sum / 10)
      result = sum % 10 + result
    }
    if(carry === 1) {
      result = '1' + result
    }
    return result
  }
  
  toString() {
    return this.strList.join('')
  }
}

// usage
const big1 = new BigInt('1234232453525454546445451434342153453454545454545454');
const big2 = new BigInt('1234232453525454546445451434342153453454545454545454');
console.log(big1.plus(big2));

// =========================
// 题目：实现一个可以缓存其他函数的高阶函数memoize。能够实现：当入参相同时，可以不经过计算，直接返回结果。
/** 求平方根 */
// 20.54-21.02
function sqrt(n) { 
  console.log('执行了')
  return Math.sqrt(n) 
}

const memoize = fn => {
  const cache = new Map()
  return (...args) => {
    let result = cache.get(args.join(',')) // 这里只考虑了参数都是基本类型，引用类型没有想到好的解决方法
    if(result) {
      return result
    }
    result = fn(...args)
    cache.set(args.join(','), result)
    return result
  }
}
const cachedSqrt = memoize(sqrt)
console.log(cachedSqrt(4)) // 2
console.log(cachedSqrt(4))// 不经过计算，直接输出结果2

// =========================
// 题目：实现快速排序
//21.02-21.22
function quicksort(array, left = 0, right = array.length - 1) {
  if(!Array.isArray(array)) {
    throw new TypeError(`${array} is not an array`)
  }
  if(array.length <= 1) {
    return array
  }
  let partitionIndex
  console.log(left, right)
  if(left < right) {
    partitionIndex = partition(array, left, right)
    quicksort(array, left, partitionIndex - 1)
    quicksort(array, partitionIndex + 1, right)
  }
  return array
}

function partition(array, left, right) {
  const baseIndex = left
  let j = baseIndex + 1
  for(let i = j; i <= right; i++) {
    if(array[i] <  array[baseIndex]) {
      [array[i], array[j]] = [array[j], array[i]]
      j++
    }
  }
  [array[baseIndex], array[j - 1]] = [array[j - 1], array[baseIndex]]
  return j - 1
}

// test
var array = [4, 7, 87, 34, 56, 69, 19, 26, 7, 9, 33];
var result = quicksort(array);

console.log(result)


// =========================
// 实现多叉树的广度度优先搜索
//21.22-21.35
function bfs(tree, name){
  if(!tree || !name) {
    return null
  }
  const queue = [tree]
  let currentNode = null
  while(queue.length) {
    let length = queue.length
    while(length--) {
      currentNode = queue.shift()
      if(currentNode.name === name) {
        return currentNode
      }
    }
    queue.push(...currentNode.children)
  }
  return null
}

var tree = {
  name : '中国',
  children : [
    {
      name : '北京',
      children : [
        {
          name : '朝阳群众'
        },
        {
          name : '海淀区'
        },
                {
          name : '昌平区'
        }
      ]
    },
    {
      name : '浙江省',
      children : [
        {
          name : '杭州市',
          code : 0571,
        },
        {
          name : '嘉兴市'
        },
        {
          name : '绍兴市'
        },
        {
          name : '宁波市'
        }
      ]
    }
  ]
};

var node = bfs(tree, '杭州市');
console.log(node);    // { name: '杭州市', code: 0571 }