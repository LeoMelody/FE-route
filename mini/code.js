console.log(1)
setTimeout(()=>{
  console.log(2)
}, 5)

setTimeout(()=>{
  console.log(6)
})

const promise = new Promise((resolve, reject) => {
  console.log(3)
  setTimeout(function() {
    resolve()
  })
}).then(function() {
  console.log(4)
})
console.log(5)