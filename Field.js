export class Field {
  constructor(){
    this.canvas = document.createElement('canvas')
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
    this.context = this.canvas.getContext('2d')
    this.particles = []
    document.body.appendChild(this.canvas)

    this.gravity = -0.1
    this.wind = 0.06
  }

  update(timestamp){
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.particles.forEach(particle => particle.update(timestamp))
    this.life++
  }

  updateForces(x, y){
    const divisor = 1000
    this.particles.forEach(particle => {
      particle.setGravity(-y / divisor)
      particle.setWind(x / divisor)
    })
  }

  addParticle(particle) {
    particle.setContext(this.context)
    particle.setGravity(this.gravity)
    particle.setWind(this.wind)
    this.particles.push(particle)
  }
}