import { Particle } from "./Particle"
import { INITIAL_VALUES } from "./UI"

export class Field {
  constructor(){
    this.canvas = document.createElement('canvas')
    this.context = this.canvas.getContext('2d')
    document.body.appendChild(this.canvas)

    this.setRetinaDimensions()

    this.particles = new Set()
    this.gravity = INITIAL_VALUES.gravity
    this.wind = INITIAL_VALUES.wind
    
    this.particleConfig = { ...INITIAL_VALUES }

    this.emitting = false

  }

  setRetinaDimensions(){
    this.canvas.width = window.innerWidth * window.devicePixelRatio;
    this.canvas.height = (window.innerHeight - document.getElementById('hud').getBoundingClientRect().height) * window.devicePixelRatio
    this.context.scale(window.devicePixelRatio, window.devicePixelRatio)
    this.canvas.style.width = window.innerWidth
    this.canvas.style.height = window.innerHeight - document.getElementById('hud').getBoundingClientRect().height
  }

  update(timestamp){
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.particles.forEach(particle => particle.update(timestamp))
  }

  setConfig = (keyVal) => {
    this.particleConfig = {
      ...this.particleConfig,
      ...keyVal,
    }
    this.particles.forEach(particle => particle.setConfig(this.particleConfig))
  }

  updateForces(x, y){
    const divisor = 1000
    this.gravity = -y / divisor
    this.wind = x / divisor
    this.particles.forEach(particle => {
      particle.setGravity(this.gravity)
      particle.setWind(this.wind)
    })

    if (this.gravity === 0) {
      this.stop()
    } else if (!this.emitting) {
      this.start()
    }
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
          x: Math.random() * this.canvas.width / window.devicePixelRatio,
          y: this.gravity < 0 ? 1 : -((this.canvas.height / window.devicePixelRatio) - this.particleConfig.size)
        }
      }))
      const interval = 100 - this.particleConfig.intensity
      this.timeout = setTimeout(startParticles, interval)
    }

    startParticles()
    this.emitting = true
  }

  onResize = () => {
    this.setRetinaDimensions()
  }

  stop(){
    this.emitting = false
    clearTimeout(this.timeout)
  }
}