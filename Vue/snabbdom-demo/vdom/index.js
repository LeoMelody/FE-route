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