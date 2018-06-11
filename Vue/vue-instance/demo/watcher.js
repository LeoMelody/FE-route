class Watcher{
    constructor(vm, exp, fn) {
        this.vm = vm
        console.log(this.vm)
        this.exp = exp
        this.fn = fn
        Dep.target = this
    }

    update() {
        this.fn.call(this.vm, this.vm[this.exp])
    }
}
