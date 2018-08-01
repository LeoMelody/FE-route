export default class Random {
  constructor() {
    
  }

  /**
   * 生产随机位置
   * @param {*} x 生成随机的横向范围
   * @param {*} y 生产随机的纵向范围
   */
  static RandomPosition(x, y) {
    x = Math.floor(x * Math.random())
    y = Math.floor(y * Math.random())
    return {
      x,y
    }
  }
  
  /**
   * 返回半径为num～4+num大小的数值
   */
  static RandomRadius(num) {
    return Math.floor(Math.random()*5+(num || 0))
  }

  /**
   * 生成随机速度 v~v+4
   */
  static RandomVelocity(v) {
    return Math.floor(Math.random()*5+(v || 0))
  }

  /**
   * 生成随机透明度
   */
  static RandomOpacity() {
    return Math.random()
  }
}