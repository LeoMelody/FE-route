import Star from './Star'
export default class Back {
  constructor(el) {
    this._init()
    this.canvas = document.querySelector(el)
    this.ctx = this.canvas.getContext('2d')
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
  }

  /**
   * 初始化方法
   */
  _init() {
    this.__proto__.stars = []
    this.MAX = 100
    this.creatStar()
  }

  creatStar() {
    setInterval(() => {
      if (this.stars.length > 10) {
        return
      } else {
        Star.creat(this.ctx)
      }
    }, 1000)
  }
}