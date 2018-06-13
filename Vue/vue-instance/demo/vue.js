/**
 * 自定义的Vue对象
 */
// import Dep from './dep'

class Vue {
    constructor(data) {
        // 将data数据封装到Vue实例的最外层属性上
        Object.assign(this, data.data)
        // 对数据实施监听操作
        this.observer(this)

        this.handelMethod(data.methods)
        // this.__proto__.ele = document.querySelector('#' + (data.el || 'app'))
        // this.compileElement(this.nodeToFragment())
        // this.nodeToFragment()
        new Compile(this, '#' + data.el)
        data.mounted.call(this)
    }

    /**
     * 对传入的数据进行解析
     */
    observer(obj) {
        Object.keys(obj).map((item)=> {
            if (typeof obj[item] === 'object') {
                this.observer(obj[item])
            } else {
                this.defineReactive(obj, item, obj[item])
            }
        })
        
    }

    /**
     * 处理methods
     */
    handelMethod(methods) {
        this.__proto__.methods = {}
        Object.keys(methods).forEach(item=> {
            this.__proto__.methods[item] = methods[item]
        })
    }

    /**
     * 对传入的数据进行劫持
     * @param {*} obj 
     * @param {*} attr 
     * @param {*} value 
     */
    defineReactive(obj, attr, value) {
        const dep = new Dep() // 实例化一个订阅者数组对象
        Object.defineProperty(obj, attr, {
            enumerable: true,
            configurable: true,
            get() {
                if (Dep.target) {
                    dep.addSub(Dep.target) // Dep.target 就是watcher 为什么在调用get的时候才添加Watcher，因为有些属性我们需要更新（使用的）, 有些不需要（没有使用的）
                }
                return value 
            },
            set(newVal) {
                if (value === newVal) return
                value = newVal
                dep.notify()
            }
        })
    }
}


// export default Vue