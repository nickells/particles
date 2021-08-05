export class DrawForceController {
  constructor(canvasContext, canvasElem){
    this.canvasContext = canvasContext
    canvasElem.addEventListener('mousedown', this.onMouseDown)
    canvasElem.addEventListener('mouseup', this.onMouseUp)
    canvasElem.addEventListener('mousemove', this.onMouseMove)

    this.state = {
      down: false
    }

    this._onChange = () => {}
  }

  onChange = (func) => {
    this._onChange = func
  }

  onMouseDown = (e) => {
    this.startPoint = {x: e.offsetX, y: e.offsetY}
    this.endPoint = {x: e.offsetX, y: e.offsetY}
    this.state.down = true
  }
  
  onMouseUp = (e) => {
    if (!this.state.down) return
    this.state.down = false
    this.endPoint = {x: e.offsetX, y: e.offsetY}

    this._onChange(
      this.endPoint.x - this.startPoint.x,
      this.endPoint.y - this.startPoint.y,
    )
  }

  onMouseMove = (e) => {
    if (this.state.down) {
      this.endPoint = {x: e.offsetX, y: e.offsetY}
    }
  }

  update() {
    if (this.state.down) {
      this.canvasContext.strokeStyle = 'red'
      this.canvasContext.beginPath()
      this.canvasContext.moveTo(this.startPoint.x, this.startPoint.y)
      this.canvasContext.lineTo(this.endPoint.x, this.endPoint.y)
      this.canvasContext.stroke();
    }
  }
}