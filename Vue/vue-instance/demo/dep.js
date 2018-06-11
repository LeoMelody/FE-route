/**
 * Dep用来收集所有的观察者
 */
class Dep{
    constructor() {
        // console.log(this)
        this.subs = []
    }

    addSub(sub) {
        this.subs.push(sub)
    }

    notify() {
        console.log(this)
        // 更新
        this.subs.forEach(item=>{
            item.update()
        })
    }
}
