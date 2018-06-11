class Vue{
    constructor(data) {
        Object.assign(this, data.data)
        this.observer(this)
    }

    /**
     * 实现一个观察者来监听
     */
    observer(obj) {
        Object.keys(obj).forEach(item=> {
            if (typeof obj[item] === 'object') { // 如果当前项是对象，需要深度监听
                this.observer(obj[item])
            } else {
                this.defineReactive(obj, item, obj[item])
            }
        })
    }

    defineReactive(obj, attr, val) {
        Object.defineProperty(obj, attr, {
            enumerable: true,
            configurable: true,
            get() {
                return val
            },
            set() {
                attr = val
                console.log('数据更改了！')
            }
        })
    }
}