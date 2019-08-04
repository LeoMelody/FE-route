/*
 * @Author: leo 
 * @Date: 2019-07-29 11:32:42 
 * @Last Modified by: leo
 * @Last Modified time: 2019-08-02 16:55:02
 * selfVue 第一部分
 */

class SelfVue {
  constructor(options = {}) {
    this.$data = options.data
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
    let value = data[key]
    // 增加递归调用
    if (value && typeof value === 'object') {
      observer(value)
    } else {
      reactive(data, key, value)
    }
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

let vm = new SelfVue({
  data: {
    name: 'wyh',
    product: {
      name: '提放保',
      code: 'TFB'
    }
  }
})

vm.$data.name = 'dcp' // 我要更新数据啦
vm.$data.product.name = '交易保' // 我要更新数据啦
console.log(vm.$data.name, vm.$data.product.name) // dcp 交易保