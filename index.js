/*
  tuesday: use real physics √
  idea: window dragging? √

  point reset:
    instead of respawning a point, make a new one
  config
  "gravity" VS "movement"
  free will slider
    - pick random point on canvas
    - for X ticks, velocity or force in that direction
    - switch after a while or when you hit it
    - or just use 5 sine waves

*/

import { DrawForceController } from "./draw-force"
import { Field } from "./Field"
import { Particle } from "./Particle"


const field = new Field()
const drawController = new DrawForceController(field.context)

drawController.onChange((x, y) => {
  field.updateForces(x, y)
})

for (let i = 0; i < 100; i++){
  field.addParticle(new Particle())
}

const loop = (timestamp) => {
  field.update(timestamp)
  drawController.update()
  requestAnimationFrame(loop)
}


loop()