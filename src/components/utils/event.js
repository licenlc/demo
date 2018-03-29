import Vue from 'vue'

const isServer = Vue.prototype.$isServer

export function on (target, event, handler) {
  !isServer && target.addEventListener(event, handler, false)
}

export function off (target, event, handler) {
  !isServer && target.removeEventListener(event, handler)
}
