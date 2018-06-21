class Util{
    constructor() {
        this.__init()
    }

    __init() {
        /**
         * 初始化方法
         * @description 可能会加入一些类型判断
         */
    }

    /**
     * 
     * @param {*} arr 需要找寻的数组 
     * @param {*} attr 找寻的属性
     * @param {*} val 属性值
     */
    findObj(arr, attr, val) {
        if(!Array.isArray(arr)) return {}
        var obj = arr.find(n=>{
            return n[attr] == val
        })

        return obj || {}
    }
}

module.exports = Util