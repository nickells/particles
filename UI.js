import Knob from "./Knob"

export const INITIAL_VALUES = {
  lifespan: 1620,
  autonomy: 1,
  size: 5,
  intensity: 100,
  gravity: -0.1,
  wind: 0,
}

export const init = (fieldInstance) => {
  const lifespan = new Knob({
    notches: 16,
    min: 100,
    max: 2000,
    selector: document.getElementById('knob-1')
  })
  .setValue(INITIAL_VALUES.lifespan)
  .onChange(val => {
    let _val = Math.round(val)
    fieldInstance.setConfig({
      lifespan: _val === 2000 ? Infinity : _val
    })
  })
  const autonomy = new Knob({
    notches: 6,
    min: 0,
    max: 5,
    selector: document.getElementById('knob-2')
  })
  .setValue(INITIAL_VALUES.autonomy)
  .onChange(val => {
    fieldInstance.setConfig({
      autonomy: Math.round(val)
    })
  })
  const size = new Knob({
    notches: 8,
    min: 2,
    max: 9,
    selector: document.getElementById('knob-3')
  })
  .setValue(INITIAL_VALUES.size)
  .onChange(val => {
    fieldInstance.setConfig({
      size: Math.round(val)
    })
  })
  const intensity = new Knob({
    notches: 16,
    min: 0,
    max: 100,
    selector: document.getElementById('knob-4')
  })
  .setValue(INITIAL_VALUES.intensity)
  .onChange(val => {
    fieldInstance.setConfig({
      intensity: Math.round(val)
    })
  })
}