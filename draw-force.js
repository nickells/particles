import { getClientCoords } from "./Knob"

export class DrawForceController {
  constructor(canvasContext){
    this.canvasContext = canvasContext
    this.canvasContext.canvas.addEventListener('mousedown', this.onMouseDown)
    this.canvasContext.canvas.addEventListener('mouseup', this.onMouseUp)
    this.canvasContext.canvas.addEventListener('mousemove', this.onMouseMove)
    this.canvasContext.canvas.addEventListener('touchstart', this.onMouseDown)
    this.canvasContext.canvas.addEventListener('touchend', this.onMouseUp)
    this.canvasContext.canvas.addEventListener('touchmove', this.onMouseMove)

    this.state = {
      down: false
    }

    this._onChange = () => {}
  }

  onChange = (func) => {
    this._onChange = func
  }

  onMouseDown = (e) => {
    e.preventDefault();
    const { x, y } = this.getCanvasCoords(e)
    this.startPoint = {x, y}
    this.endPoint = {x, y}
    this.state.down = true
  }
  
  onMouseUp = (e) => {
    e.preventDefault();
    if (!this.state.down) return
    this.state.down = false

    this._onChange(
      this.endPoint.x - this.startPoint.x,
      this.endPoint.y - this.startPoint.y,
    )
  }

  onMouseMove = (e) => {
    e.preventDefault();
    const { x, y } = this.getCanvasCoords(e)
    if (this.state.down) {
      this.endPoint = {x, y}
    }
  }

  getCanvasCoords = (e) => {
    const {x: canvasX, y: canvasY} = getClientCoords(e);
    const x = canvasX - e.target.offsetLeft
    const y = canvasY - e.target.offsetTop
    return {x, y}
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