import Back from './Background'
import Random from '../common/Random'

export default class Star {
  constructor(ctx) {
    this._ctx = ctx
    this._init()
  }

  _init() {
    this.position = Random.RandomPosition(this._ctx.canvas.width, 20)
    this.radius = Random.RandomRadius(5)
    this.v = Random.RandomVelocity(5)
    this.startDrop()   
    // requestAnimationFrame(this.startDrop)
  }

  render() {
    this.clearArc()
    this._ctx.beginPath()
    this.position.y += this.v/6
    this._ctx.arc(this.position.x, this.position.y, this.radius, 0, 2*Math.PI)
    this._ctx.fillStyle = '#fff'
    this._ctx.fill()
  }

  clearArc() {
    this._ctx.fillStyle = 'rgba(0,0,0,.8)'
    this._ctx.fillRect(this.position.x - this.radius, this.position.y - this.radius, 2 * this.radius, 2 * this.radius)
    // this._ctx.clearRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height)
    // this._ctx.fillStyle = 'rgba(0,0,0,.8)'
    // this._ctx.fillRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height)
    // this._ctx.clearRect(this.position.x - this.radius, this.position.y - this.radius, 2 * this.radius, 2 * this.radius)
  }

  static creat(ctx) {
    const star = new Star(ctx)
    Back.prototype.stars.push(star)
    return star
  }

  /**
   * 销毁小球
   */
  destroy() {
    
  }

  /**
   * 开始降落
   */
  startDrop() {
    this.render()
    // console.log(this.position)
    if (this.position.y > this._ctx.canvas.height) {
      console.log(this.position)
      return 
    } else {
      requestAnimationFrame(() => {
        this.startDrop()
      })
    }
  }
}