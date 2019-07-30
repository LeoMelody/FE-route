/*
 * @Author: leo 
 * @Date: 2019-07-30 10:05:15 
 * @Last Modified by: leo
 * @Last Modified time: 2019-07-30 10:16:10
 * 模拟一个VNode
 */

class VNode {
  constructor(tag, key, data, children, text, elm) {
    this.tag = tag
    this.key = key
    this.data = data
    this.children = children
    this.text = text
    this.elm = elm
  }
}

/**
  <div id="name" v-show="isShow">{{name}}</div>
 */

 const v = new VNode('div', undefined, {
    
 }, [
   new VNode(undefined, undefined, undefined, )
 ])