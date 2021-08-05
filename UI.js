import Knob from "./Knob"

export const init = (fieldInstance) => {
  const lifespan = new Knob({
    notches: 16,
    min: 100,
    max: 2000,
    selector: document.getElementById('knob-1')
  })
  .onChange(val => {
    fieldInstance.setConfig({
      lifespan: val === 2000 ? Infinity : val
    })
  })
  const freeWill = new Knob({
    notches: 6,
    min: 0,
    max: 5,
    selector: document.getElementById('knob-2')
  })
  .onChange(val => {
    fieldInstance.setConfig({
      freeWill: val
    })
  })
  const size = new Knob({
    notches: 8,
    min: 2,
    max: 10,
    selector: document.getElementById('knob-3')
  })
  .onChange(val => {
    fieldInstance.setConfig({
      size: val
    })
  })
  const intensity = new Knob({
    notches: 16,
    min: 1,
    max: 100,
    selector: document.getElementById('knob-4')
  })
  .onChange(val => {
    const interval = 101 - val
    fieldInstance.interval = interval
  })
}