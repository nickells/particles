import { Particle } from "./Particle"

export class Field {
  constructor(){
    this.canvas = document.createElement('canvas')
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight - document.getElementById('hud').getBoundingClientRect().height
    this.context = this.canvas.getContext('2d')
    this.particles = new Set()
    document.body.appendChild(this.canvas)

    this.interval = 1

    this.gravity = -0.1
    this.wind = 0
    
    this.particleConfig = {
      lifespan: 500,
      freeWill: 1,
      size: 5,
    }
  }

  update(timestamp){
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.particles.forEach(particle => particle.update(timestamp))
    this.life++
  }

  setConfig = (keyVal) => {
    this.particleConfig = {
      ...this.particleConfig,
      ...keyVal,
    }
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
    particle.setConfig(this.particleConfig)
    this.particles.add(particle)
    particle.onDelete(particle => {
      this.particles.delete(particle)
    })
  }

  start(){
    const startParticles = () => {
      this.addParticle(new Particle({
        startPosition: {
          x: Math.random() * window.innerWidth,
          y: this.gravity < 0 ? 1 : -(window.innerHeight - document.getElementById('hud').getBoundingClientRect().height)
        }
      }))
      this.timeout = setTimeout(startParticles, this.interval)
    }

    startParticles()
  }

  stop(){
    clearTimeout(this.timeout)
  }
}