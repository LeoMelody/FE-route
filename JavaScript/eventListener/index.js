// =========================
// 题目：编写一个简单的事件监听处理器，要求具备 on 方法绑定、off 方法解绑
// 编写一个简单的事件监听处理器
// 1. 具备 on 方法绑定事件
// 2. 具备 off 方法解绑事件

function EventEmitter () {
  this.listenerMap = new Map()
}

EventEmitter.prototype.on = function(type, listener) {
  if(type === '*') { // * 我理解是给已注册的所有类型添加监听
    
  }
}

EventEmitter.prototype.emit = function(type, params = {}) {

}

EventEmitter.prototype.once = function(type, listener) {

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
class BigInt() {
  constructor(str) {
  }
  
  plus(bigInt) {
    
  }
  
  toString() {
  }
}

// usage
const big1 = new BigInt('1234232453525454546445451434342153453454545454545454');
const big2 = new BigInt('1234232453525454546445451434342153453454545454545454');
console.log(bigint1.plus(bigint2));

// =========================
// 题目：实现一个可以缓存其他函数的高阶函数memoize。能够实现：当入参相同时，可以不经过计算，直接返回结果。
/** 求平方根 */
function sqrt(n) { return Math.sqrt(n) }

const memoize = fn => {
  // 实现
}
const cachedSqrt = memoize(sqrt)
cachedSqrt(4) // 2
cachedSqrt(4) // 不经过计算，直接输出结果2

// =========================
// 题目：实现快速排序

function quicksort(array) {
	// TODO 
}

// test
var array = [4, 7, 87, 34, 56, 69, 19, 26, 7, 9, 33];
var result = quicksort(array);


// =========================
// 实现多叉树的广度度优先搜索
function bfs(tree, name){
  // TODO: 你的代码
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