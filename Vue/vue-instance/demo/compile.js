class Compile{
    constructor(vm, el) {
        this.vm = vm
        this.el = document.querySelector(el)
        this.fragment = null
        this.init()
    }

    /**
     * 入口方法
     */
    init() {
        if (this.el) {
            this.fragment = this.nodeToFragment()
            this.compileElement(this.fragment)
            this.el.appendChild(this.fragment)
        } else {
            alert('error')
            return 
        }
    }

    /**
     * 解析方法
     */
    nodeToFragment() {
        var fragment = document.createDocumentFragment()
        var el = this.el        
        var child = el.firstChild
        while(child) {
            fragment.appendChild(child)
            child = el.firstChild
        }
        return fragment
    }

    compile(node) {
        var nodeAttrs = node.attributes
        var self = this
        Array.from(nodeAttrs).forEach(attr=>{
            var attrName = attr.name
            if (self.isDirective(attrName)) { // 如果有属性是v开头的
                var exp = attr.value
                var dir = attrName.substring(2) // 去除v-后的
                if (self.isEventDirective(dir)) { // 是否是事件指令
                    self.compileEvent(node, exp, dir)
                } else {
                    self.compileModal(node, exp, dir) // 先做一个v-model的解析
                }
                node.removeAttribute(attrName);
            }
        })
    }

    compileElement(el) {
        var childNodes = el.childNodes
        var self = this
        Array.from(childNodes).forEach(node => {
            var reg = /\{\{(.*)\}\}/
            var text = node.textContent
            
            if(self.isElementNode(node)) { // 如果是elementnode，要解析
                self.compile(node)
            } else if (self.isTextNode(node) && reg.test(text)) { // 有匹配的项
                self.compileText(node, reg.exec(text)[1])
            }
    
            if (node.childNodes && node.childNodes.length) {
                self.compileElement(node)
            }
        })
    }

    compileText(node, exp) {
        var self = this
        this.updateText(node, this.vm[exp])
        new Watcher(this.vm, exp, function(val) {
            self.updateText(node, val)
        })
    }

    compileEvent(node, exp, dir) {
        var eventType = dir.split(':')[1] // 取出事件名称
        var cb = this.vm.methods && this.vm.methods[exp]
        if (eventType && cb) {
            node.addEventListener(eventType, ()=> {
                cb.call(this.vm)
            }, false)
        }
    }

    compileModal(node, exp, dir) {
        var self = this
        var val = this.vm[exp]
        this.modelUpdater(node, val)
        new Watcher(this.vm, exp, (value)=>{
            this.modelUpdater(node, value)
        })

        node.addEventListener('input', (e)=>{
            var newValue = e.target.value;
            if (val === newValue) {
                return;
            }
            self.vm[exp] = newValue;
            val = newValue;
        }, false)
    }
    /**
     * 判断方法
     */
    isDirective(attr) {
        return attr.indexOf('v-') == 0;
    }
    isEventDirective(dir) {
        return dir.indexOf('on:') === 0;
    }
    isElementNode(node) {
        return node.nodeType == 1;
    }
    isTextNode(node) {
        return node.nodeType == 3;
    }
    modelUpdater(node, value) {
        node.value = typeof value == 'undefined' ? '' : value;
    }

    /**
     * 更新某个节点的文本
     * @param {*} node 
     * @param {*} text 
     */
    updateText(node, text) {
        // 下面这个其实是有问题的，需要进行修改
        node.textContent = (typeof text === 'undefined') ? '' : text
    }

}