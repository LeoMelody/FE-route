/*
 * @Author: leo 
 * @Date: 2019-07-29 11:22:34 
 * @Last Modified by: leo
 * @Last Modified time: 2019-07-29 11:26:24
 * Object.defineProperty
 * @description Object.defineProperty(obj, prop, descriptor) 
 * @return obj
 */

let obj = {
  name: 'wyh'
}

let name = obj.name

Object.defineProperty(obj, 'name', {
  configurable: true,
  enumerable: true,
  get() {
    return name
  },
  set(val) {
    if (val === name) return 
    // 数据劫持，在这里我们可以监听到数据的更新
    console.log('我要更新数据了')
    name = val
  }
})

obj.name = 'dcp'