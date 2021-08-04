export class DrawForceController {
  constructor(canvasContext){
    this.canvasContext = canvasContext
    document.addEventListener('mousedown', this.onMouseDown)
    document.addEventListener('mouseup', this.onMouseUp)
    document.addEventListener('mousemove', this.onMouseMove)

    this.state = {
      down: false
    }

    this._onChange = () => {}
  }

  onChange = (func) => {
    this._onChange = func
  }

  onMouseDown = (e) => {
    this.startPoint = {x: e.pageX, y: e.pageY}
    this.endPoint = {x: e.pageX, y: e.pageY}
    this.state.down = true
  }
  
  onMouseUp = (e) => {
    this.state.down = false
    this.endPoint = {x: e.pageX, y: e.pageY}

    this._onChange(
      this.endPoint.x - this.startPoint.x,
      this.endPoint.y - this.startPoint.y,
    )
  }

  onMouseMove = (e) => {
    if (this.state.down) {
      this.endPoint = {x: e.pageX, y: e.pageY}
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