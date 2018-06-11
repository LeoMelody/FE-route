/**
 * 自定义的Vue对象
 */
// import Dep from './dep'

class Vue {
    constructor(data) {
        
        // 对ele进行解析
        Object.assign(this, data.data)
        this.observer(this)
        this.handelMethod(data.methods)
        this.__proto__.ele = document.querySelector('#' + (data.el || 'app'))
        this.compileElement(this.nodeToFragment())
        // this.nodeToFragment()
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
        Object.keys(methods).forEach(item=> {
            this.__proto__[item] = methods[item]
        })
    }

    /**
     * 对传入的数据进行劫持
     * @param {*} obj 
     * @param {*} attr 
     * @param {*} value 
     */
    defineReactive(obj, attr, value) {
        const dep = new Dep()
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

    /**
     * 先将node转换给Fragment再开始解析，减少开销
     */
    nodeToFragment() {
        var fragment = document.createDocumentFragment()
        var el = this.ele        
        var child = el.firstChild
        while(child) {
            fragment.appendChild(child)
            child = el.firstChild
        }
        return fragment
    }

    /**
     * 解析元素
     * @param {*} el 元素节点 
     */
    compileElement(el) {        
        var childNodes = el.childNodes
        var self = this
        Array.from(childNodes).forEach(node => {
            var reg = /\{\{(.*)\}\}/
            var text = node.textContent
    
            if (self.isTextNode(node) && reg.test(text)) { // 有匹配的项
                self.compileText(node, reg.exec(text)[1])
            }
    
            if (node.childNodes && node.childNodes.length) {
                self.compileElement(node)
            }
        })
        this.ele.appendChild(el)
    }

    /**
     * 解析文本中{{}}包含的数据属性
     * @param {*} node 
     * @param {*} exp 
     */
    compileText(node, exp) {
        var self = this
        var initText = this[exp]
        this.updateText(node, initText)
        new Watcher(this, exp, function(val) {
            self.updateText(node, val)
        })
    }

    /**
     * 更新某个节点的文本
     * @param {*} node 
     * @param {*} text 
     */
    updateText(node, text) {
        node.textContent = (typeof text === 'undefined') ? '' : text
    }

    /**
     * 判断是否是文本节点
     * @param {*} node 
     */
    isTextNode(node) {
        if (node.nodeName === '#text') {
            return true
        }
        return false
    }
}


// export default Vue