/*
  tuesday: use real physics
  idea: window dragging?
  config

*/
class Field {
  constructor(){
    this.canvas = document.createElement('canvas')
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
    this.context = this.canvas.getContext('2d')
    this.particles = []
    document.body.appendChild(this.canvas)

    this.gravity = 1
  }

  update(timestamp){
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.particles.forEach(particle => particle.update(timestamp))
    this.life++
  }

  addParticle(particle) {
    particle.setContext(this.context)
    particle.setGravity(this.gravity)
    this.particles.push(particle)
  }
}

class Particle {
  constructor(){
    this.position = {
      x: window.innerWidth * Math.random(),
      y: -window.innerHeight * Math.random(),
    }
    this.startPosition = {...this.position} // this might be useful
    this.force = {
      x: 0,
      y: 0,
    }
    this.acceleration = {
      x: 0,
      y: 0,
    }
    this.velocity = {
      x: 0,
      y: 0,
    }

    this.mass = 0.05

    this.seed = Math.random()

    this.life = 0
  }

  setContext(context){
    this.context = context
  }

  setGravity(gravity){
    this.force.y = gravity
  }

  reset(){
    this.constructor()
  }

  update(){
    this.life++

    // todo: only update this if changed from last tick
    this.acceleration = {
      x: this.force.x * this.mass,
      y: this.force.y * this.mass,
    }

    this.velocity = {
      x: this.life * this.acceleration.x,
      y: this.life * this.acceleration.y
    }

    this.position.x += this.velocity.x
    this.position.y += this.velocity.y


    // draw
    this.context.fillStyle = 'black'
    this.context.fillRect(this.position.x, -this.position.y, 5, 5)

    // reset
    if (this.force.y < 0) {
      if (this.position.y <= -window.innerHeight) {
        this.position.y = 0
        this.life = 0
      }
    }
    else if (this.force.y > 0) {
      if (this.position.y >= 0) {
        this.position.y = -window.innerHeight
        this.life = 0
      }
    }
  }
}

const field = new Field()
for (let i = 0; i < 1000; i++){
  field.addParticle(new Particle())
}

const loop = (timestamp) => {
  field.update(timestamp)
  requestAnimationFrame(loop)
}

loop()