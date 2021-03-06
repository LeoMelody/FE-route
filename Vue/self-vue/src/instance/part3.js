/*
 * @Author: leo 
 * @Date: 2019-07-29 11:32:42 
 * @Last Modified by: leo
 * @Last Modified time: 2019-08-07 19:08:22
 * selfVue 第一部分
 */
var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: () => {},
  set: () => {}
};

class Dep {
  constructor() {
    // init subs 
    this.subs = []
  }

  /**
   * 添加订阅者
   * @param {*} sub 
   */
  addSub(sub) {
    this.subs.push(sub)
  }

  /**
   * 通知更新功能
   */
  notify() {
    this.subs.forEach(sub => {
      sub.update()
    })
  }
}

// 防止错误收集
Dep.target = null

/**
 * 
 */
class Watcher {
  /**
   * 
   * @param {*} ctx 当前上下文
   * @param {*} exp 当前属性名
   * @param {*} cb 回调函数
   */
  constructor(ctx, exp, cb) {
    this.ctx = ctx
    this.exp = exp
    this.cb = cb
    this.value = this.get()
  }

  /**
   * 强制触发observer中的get
   */
  get() {
    Dep.target = this // 
    // 触发get，并收集到当前的watcher对象
    // let value = selfVue.$data.name // get
    let value = this.ctx.$data[this.exp]
    Dep.target = null
    return value
  }

  /**
   * 更新视图
   */
  update() {
    const oldVal = this.value
    const value = this.ctx.$data[this.exp]
    if (value !== oldVal) {
      this.value = value
      this.cb.call(this.ctx, value, oldVal)
    }
  }
}
 
class SelfVue {
  constructor(obj = {}) {
    this.$data = obj.data
    observer.call(this, this.$data)
    this.$el = obj.el
    // 获取当前挂载的根结点
    typeof this.$el === 'string' && this.initEle()
    this.compiler()
  }

  initEle() {
    this.$root = document.querySelector(this.$el)
  }

  /**
   * 模拟编译过程
   */
  compiler() {
    // 这里模拟name在页面上的初始值赋值，为了防止多次触发observer中的get，所以这里使用watcher的value
    // 给这个name添加一个观察者，当其发生变化的时候，需要通知视图去修改它
    this.$root.innerHTML = new Watcher(this, 'name', function(val) {
      this.$root.innerHTML = val
    }).value
  }
}

/**
 * 观察者方法
 * @param {*} data 
 */
function observer(data) {
  if(!data || typeof data !== 'object') return 
  
  Object.keys(data).forEach(key => {
    // 注意，是要在第一层的时候就收集哦
    proxy(this, '$data', key)
    reactive(data, key, data[key])
  })
}

/**
 * 完成数据劫持的方法
 * @param {*} data 源对象数据
 * @param {*} key 属性
 * @param {*} value 值
 */
function reactive(data, key, value) {
  // 每一个新的值
  const dep = new Dep()
  Object.defineProperty(data, key, {
    configurable: true,
    enumerable: true,

    get() {
      // before get Watcher
      console.log(`收集了一个${key}`)
      // 这里做依赖收集, 后面会做一些更严格的处理，这里先这样写
      if (Dep.target) {
        dep.addSub(
          // 这里有个Watcher，当其监听到当其dep负责的value发生修改时，就会通知视图去更新
          // 这个更新操作是在set中完成的，这里只是注册进去这个Watcher
          Dep.target // watcher
        )
      }
    
      return value
    },
    set(val) {
      if (val === value) return
      // 数据劫持处
      // 这里做更新通知
      console.log('我要更新数据啦')
      value = val
      dep.notify()
    }
  })
}

let selfVueInstance = new SelfVue({
  data: {
    name: 'wyh',
    age: 18,
    person: {
      name: 'xxx'
    }
  },
  el: '#app'
})

setTimeout(() => {
  // selfVueInstance.$data.name = 'dcp'
  // selfVueInstance.name = 'dcp'
}, 2000)

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

// const vm = new Vue({
//   // ...
// })

// // Object.defineProperty
// vm.name = 'xxx'