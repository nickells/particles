export class Field {
  constructor(){
    this.canvas = document.createElement('canvas')
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
    this.context = this.canvas.getContext('2d')
    this.particles = new Set()
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
    this.gravity = -y / divisor
    this.wind = x / divisor
    this.particles.forEach(particle => {
      particle.setGravity(this.gravity)
      particle.setWind(this.wind)
    })
  }

  addParticle(particle) {
    particle.setContext(this.context)
    particle.setGravity(this.gravity)
    particle.setWind(this.wind)
    this.particles.add(particle)
    particle.onDelete(particle => {
      this.particles.delete(particle)
    })
  }
}