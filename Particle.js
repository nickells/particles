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

    this.config = {
      lifespan: 500,
      autonomy: 1,
      size: 5,
    }


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

  setConfig(config){
    this.config = config
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

  update(timestamp){
    this.life += 1
    this.lastTime = timestamp
    
    // todo: only update this if changed from last tick
    this.acceleration = {
      x: this.force.x * this.mass,
      y: this.force.y * this.mass,
    }

    for (let i  = 0; i < this.config.autonomy; i++) {
      let dimension = i % 2 === 0 ? 'x' : 'y'
      this.position[dimension] += (this.getWobble(i) * (this.config.autonomy + 1))
    }
    // this.acceleration.x += this.getWob
    // gravity-based
    
    this.velocity = {
      x: this.life * this.acceleration.x,
      y: this.life * this.acceleration.y
    }
    

    this.position.x += this.velocity.x
    this.position.y += this.velocity.y


    // draw
    // this.context.fillStyle = 'black'
    if (this.config.lifespan < Infinity) {
      const opacity = Math.max((this.config.lifespan - this.life) / this.config.lifespan, 0)
      this.context.fillStyle = `rgba(0, 0, 0, ${opacity})`
    }
    else {
      this.context.fillStyle = `rgba(0, 0, 0, 1)`
    }
    const width = this.config.size * this.seeds[0]

    this.context.beginPath();
    this.context.arc(this.position.x, -this.position.y, width, 0, 2 * Math.PI, false);
    this.context.fill();
    const canvas = this.context.canvas
    
    // reset when OOB
    if (this.life >= this.config.lifespan) {
      this.destroy()
    }
    if (this.force.y < 0) {
      if (this.position.y <= -canvas.height) {
        this.destroy()
      }
    }
    else if (this.force.y > 0) {
      if (this.position.y >= 0) {
        this.destroy()
      }
    }
    if (this.force.x >= 0) {
      if (this.position.x >= canvas.width) {
        this.position.x = 0
      }
    }
    if (this.force.x < 0) {
      if (this.position.x <= 0) {
        this.position.x = canvas.width
      }
    }
  }
}