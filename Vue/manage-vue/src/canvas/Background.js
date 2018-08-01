import Star from './Star'
export default class Back {
  constructor(el) {
    this.canvas = document.querySelector(el)
    this.ctx = this.canvas.getContext('2d')
    this._init()
    this.setSize()
    this.fill()
  }

  setSize() {
    this.canvas.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    this.canvas.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  }

  fill() {
    this.ctx.fillStyle = 'rgba(0,0,0,.8)'
    // 调用fillRect方法填充矩形
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    // this.ctx.lineJoin = 'round'; // 画圆角矩形
    // this.ctx.lineWidth = 50
    // this.ctx.strokeStyle = 'tomato'
    // this.ctx.strokeRect(75,75,75,75)
  }

  /**
   * 初始化方法
   */
  _init() {
    this.__proto__.stars = []
    this.MAX = 100
    this.creatStar()
    this.updateAllStars()
  }

  creatStar() {
    setInterval(() => {
      if (this.stars.length > 20) {
        return
      } else {
        Star.creat(this.ctx)
      }
    }, 1000)
  }

  updateAllStars() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.fill()
    this.stars.map((item, index, arr) => {
      if (item.position.y <= this.canvas.height) {
        item.drop()
      } else {
        // 销毁小球
        item = null
        arr.splice(index, 1)
      }
    })
    requestAnimationFrame(() => {
      this.updateAllStars()
    })
  }
}