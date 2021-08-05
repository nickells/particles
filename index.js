/*
  get gravity/wind into one config called forces
  lifespan 100 pauses spawning
  color?
  blur?
*/

import { DrawForceController } from "./draw-force"
import { Field } from "./Field"
import { init } from "./UI"


const field = new Field()
const drawController = new DrawForceController(field.context)

drawController.onChange((x, y) => {
  field.updateForces(x, y)
})

field.start()

const debounce = (func) => {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => func(...args), 300)
  }
}

window.addEventListener('resize', debounce(field.onResize))

const loop = (timestamp) => {
  field.update(timestamp)
  drawController.update()
  requestAnimationFrame(loop)
}

init(field)

loop()