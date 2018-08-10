
+(function(doc, win) {
  const canvas = doc.querySelector('#canvas')
  const ctx = canvas.getContext('2d')
  canvas.width = win.innerWidth || doc.documentElement.clientWidth || doc.body.clientWidth;
  canvas.height = win.innerHeight || doc.documentElement.clientHeight || doc.body.clientHeight;
  ctx.beginPath()
  ctx.fillStyle = '#020205'
  ctx.fillRect(0,0,canvas.width,canvas.height)

  class Point {
    constructor(position = {x: canvas.width/2,
      y: canvas.height}, 
      size = 10, 
      color = 'rgba(255,255,255)', 
      vY = 100, 
      vX = 10) {
      this.position = position
      this.size = size
      this.color = color
      this.pathArr = []
      this.vY = vY
      this.vX = vX
      this._init()
    }
  
    _init() {
      ctx.beginPath()
      ctx.fillStyle = this.color
      ctx.arc(this.position.x, this.position.y, this.size, 0, 2*Math.PI)
      ctx.fill()
    }


  }
  
}(document, window))