export class Particle {
  constructor({
    startPosition
  }){
    this.position = { ...startPosition}
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

    this.mass = 0.1

    this.seeds = [ Math.random(), Math.random(), Math.random(), Math.random(), Math.random() ]

    this.lifeSpan = 450

    this.life = 0

    this._onDelete = () => {}
  }

  setContext(context){
    this.context = context
  }

  setGravity(gravity){
    this.force.y = gravity
  }

  setWind(wind){
    this.force.x = wind
  }

  getWobble(seed = 0){
    // wobbles
    const radian = Math.PI / 180
    const lifeRadians = (this.life) * radian * this.seeds[seed] // add random so it appears at a random place in the sine curve
    const horizontalMult = 0.5 * this.seeds[seed]
    const sinMult = 10 * this.seeds[seed]
    return (horizontalMult * Math.sin(lifeRadians * sinMult))
  }

  onDelete = (func) => {
    this._onDelete = func
  }

  destroy(){
    this._onDelete(this)
    delete this
  }

  update(){
    this.life++
    
    // todo: only update this if changed from last tick
    this.acceleration = {
      x: this.force.x * this.mass,
      y: this.force.y * this.mass,
    }

    this.position.x += this.getWobble()
    // this.acceleration.x += this.getWobble(1) 
    // this.acceleration.x += this.getWobble(2) / 100
    
    // this.acceleration.y += this.getWobble(3) / 100
    // this.acceleration.y += this.getWobble(4) / 100
    // gravity-based
    
    this.velocity = {
      x: this.life * this.acceleration.x,
      y: this.life * this.acceleration.y
    }
    

    this.position.x += this.velocity.x
    this.position.y += this.velocity.y


    // draw
    // this.context.fillStyle = 'black'
    if (this.lifeSpan < Infinity) {
      const opacity = Math.max((this.lifeSpan - this.life) / this.lifeSpan, 0)
      this.context.fillStyle = `rgba(0, 0, 0, ${opacity})`
    }
    const width = 3 * this.seeds[0]
    this.context.fillRect(this.position.x, -this.position.y, width, width)

    // reset when OOB
    if (this.life >= this.lifeSpan) {
      this.destroy()
    }
    if (this.force.y < 0) {
      if (this.position.y <= -window.innerHeight) {
        this.destroy()
      }
    }
    else if (this.force.y > 0) {
      if (this.position.y >= 0) {
        this.destroy()
      }
    }
    if (this.force.x >= 0) {
      if (this.position.x >= window.innerWidth) {
        this.destroy()
      }
    }
    if (this.force.x < 0) {
      if (this.position.x <= 0) {
        this.destroy()
      }
    }
  }
}