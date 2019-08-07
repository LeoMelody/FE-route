/*
 * @Author: leo 
 * @Date: 2019-08-05 00:48:43 
 * @Last Modified by: leo
 * @Last Modified time: 2019-08-07 15:50:18
 */
// init snabbdom
const snabbdom = window.snabbdom
// patch 函数
const patch = snabbdom.init({
  snabbdom_class,
  snabbdom_props,
  snabbdom_style,
  snabbdom_eventlisteners
})

const h = snabbdom.h

// init data

let dataList = [
  {
    name: 'wyh',
    age: 18
  },
  {
    name: 'wyh2',
    age: 18
  },
  {
    name: 'wyh3',
    age: 18
  }
]
const wrap = document.querySelector('#app')
const input = document.querySelector('#input')
const btn = document.querySelector('#btn')
btn.addEventListener('click', (e) => {
  let val = input.value
  update(val)
})

// create vNode
function create(data = []) {
  return h('div#app', {}, data.map(item => {
    return [
      h('div', {}, item.name),
      h('div', {}, item.age)
    ]
  }).flat(Infinity))
}

function update(val) {
  dataList[0].name = val
  var newVnode = create(dataList)
  patch(vnode, newVnode)
}

var vnode = create(dataList)

patch(wrap, vnode)