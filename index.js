/*
  init knob values
  updates in real time instead of to new particles
  get gravity/wind into one config called forces
  window resizing
  lifespan 100 pauses spawning

*/

import { DrawForceController } from "./draw-force"
import { Field } from "./Field"
import { Particle } from "./Particle"
import { init } from "./UI"


const field = new Field()
const drawController = new DrawForceController(field.context, field.canvas)

drawController.onChange((x, y) => {
  field.updateForces(x, y)
})

field.start()

const loop = (timestamp) => {
  field.update(timestamp)
  drawController.update()
  requestAnimationFrame(loop)
}

init(field)

loop()