const arguments = process.argv.splice(2) // 之所以要splice2 是因为前两项是路径配置
// process.argv[0] 表示 node的位置
// process.argv[1] 表示 当前执行脚本的位置
console.log(arguments) // ['hello', 'world']

// 从环境变量中读取参数 这个需要将参数先设置，然后再执行脚本

// NODE_ENV=production node index.js 这样 
console.log(process.env.NODE_ENV)
console.log(process.env.my_val)
