/*
 * @Author: leo 
 * @Date: 2019-08-05 00:01:57 
 * @Last Modified by: leo
 * @Last Modified time: 2019-08-05 00:22:09
 */
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

function render() {
  const fragment = document.createDocumentFragment()
  for(let item of dataList) {
    let name = document.createElement('div')
    name.innerHTML = item.name
    fragment.appendChild(name)
    let age = document.createElement('div')
    age.innerHTML = item.age
    fragment.appendChild(age)
  }
  wrap.appendChild(fragment)
}

/**
 * 更新DOM
 * @param {*} val 要修改的第一个数据的值
 * 总结： 这种写法肯定是不好的，我只是更新一点点数据，却要将这个wrap清空再去渲染一遍
 * 优化： 可以哪些修改改哪里，但是这个获取过程是非常复杂的，
 * 就我们上面这个而言，获取到就比较复杂，更别说真实的一个应用场景了
 */
function update(val) {
  // 先清空wrap内部
  wrap.innerHTML = null
  dataList[0].name = val
  render()
}

render()