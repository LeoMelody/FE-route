/*
 * @Author: leo 
 * @Date: 2019-07-29 11:32:42 
 * @Last Modified by: leo
 * @Last Modified time: 2019-07-29 11:45:49
 * selfVue 第一部分
 */

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
  Object.defineProperty(data, key, {
    configurable: true,
    enumerable: true,
    get() {
      return value
    },
    set(val) {
      if (val === value) return
      // 数据劫持处
      console.log('我要更新数据啦')
      value = val
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