import Vue from 'Vue'
import ToastVue from './Toast.vue'

const ToastConstructor = Vue.extend(ToastVue)
let toolPool = []
let getInstance = () => {
  if (toolPool.length > 0) {
    let instance = toolPool[0]
    toolPool.splice(0, 1)
    return instance
  }
  return new ToastConstructor({
    el: document.createElement('div')
  })
}
let returnAnInstance = instance => {
  if (instance) {
    toolPool.push(instance)
  }
}
let removeDOM = event => {
  if (event.target.parentNode) {
    event.target.parentNode.removeChild(event.target)
  }
}
ToastConstructor.prototype.close = () => {
  this.visible = false
  this.closed = true
  this.$el.addEventListener('transitionend', removeDOM)
  returnAnInstance(this)
}
let Toast = (options = {}) => {
  let duration = options.duration || 5000
  let instance = getInstance()
  instance.closed = false
  clearTimeout(instance.timer)
  instance.desc = typeof options === 'string' ? options : options.desc
  instance.iconClass = options.iconClass || ''
  document.body.appendChild(instance.$el)
  Vue.nextTick(() => {
    instance.visible = true
    instance.timer = window.setTimeout(function () {
      if (instance.closed) {
        return
      }
      instance.close()
    }, duration)
    return instance
  })
}

export default Toast
