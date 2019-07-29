/*
 * @Author: leo 
 * @Date: 2019-07-29 11:32:42 
 * @Last Modified by: leo
 * @Last Modified time: 2019-07-29 22:55:21
 * selfVue 第一部分
 */

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

class Watcher {
  constructor() {
    
  }

  /**
   * 更新视图
   */
  update() {
    console.log('更新视图')
  }
}
 
class SelfVue {
  constructor(obj = {}) {
    this.$data = obj.data
    observer(this.$data)
  }
}

/**
 * 观察者方法
 * @param {*} data 
 */
function observer(data) {
  if(!data || typeof data !== 'object') return 
  Object.keys(data).forEach(key => {
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
      // 这里做依赖收集, 后面会做一些更严格的处理，这里先这样写
      dep.addSub(
        // 这里有个Watcher，当其监听到当其dep负责的value发生修改时，就会通知视图去更新
        // 这个更新操作是在set中完成的，这里只是注册进去这个Watcher
      )
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
    name: 'wyh'
  }
})

selfVueInstance.$data.name = 'dcp' // 我要更新数据啦
console.log(selfVueInstance.$data.name) // dcp