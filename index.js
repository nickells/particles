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
    this.force = {
      x: (2 * Math.random()) - 1,
      y: 1,
    }
    this.startPosition = {...this.position}

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

  update(timestamp){
    this.life++
    const accelerationPixelsPerFrame = 0.08
    this.position.y += this.force.y + accelerationPixelsPerFrame * this.life
    this.context.fillStyle = 'black'
    this.context.fillRect(this.position.x, -this.position.y, 5, 5)
    const horizontalMult = 20
    const timestampSlow = this.life * (Math.PI / 180)
    const timestampOffset = this.seed * 100
    // sin(180pi / 180) = 0
    // sin(90pi / 180) = 1
    const wind = 0.0
    this.position.x = this.startPosition.x + (Math.sin(timestampOffset + timestampSlow) * horizontalMult) + (wind * this.life)
    
    if (this.position.y <= -window.innerHeight) {
      this.position.y = 0
      this.life = 0
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