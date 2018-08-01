import Back from './Background'
import Random from '../common/Random'

export default class Star {
  constructor(ctx) {
    this._ctx = ctx
    this._init()
  }

  _init() {
    this.position = Random.RandomPosition(this._ctx.canvas.width, 20)
    this.radius = Random.RandomRadius(6)
    this.v = Random.RandomVelocity(5)
    this.fillStyle = 'rgba(255, 255, 255,' + Random.RandomOpacity() + ')'
    this.drop()   
  }

  render() {
    // this.clearArc()
    this._ctx.beginPath()
    // 给小球增加阴影
    this._ctx.shadowColor = '#fff'
    this._ctx.shadowBlur = 15
    this.position.y += this.v/6
    this._ctx.arc(this.position.x, this.position.y, this.radius, 0, 2*Math.PI)
    this._ctx.fillStyle = this.fillStyle
    this._ctx.fill()
  }

  clearArc() {
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
   * 开始降落
   */
  drop() {
    this.render()
  }
}