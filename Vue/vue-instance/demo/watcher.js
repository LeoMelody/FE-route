/**
 * 订阅者
 * 每一个Watcher来执行视图更新的操作
 */
class Watcher{
    constructor(vm, exp, fn) {
        this.vm = vm
        this.exp = exp
        this.fn = fn
        this.value = this.get() 
    }

    update() {
        this.fn.call(this.vm, this.vm[this.exp])
    }

    run() {

    }

    get() {
        Dep.target = this  // 缓存自己
        var value = this.vm[this.exp]  // 强制执行监听器里的get函数
        Dep.target = null;  // 释放自己
        return value;
    }
}
