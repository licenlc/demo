import Vue from 'vue'

const isServer = Vue.prototype.$isServer

function isDef (value) {
  return value === undefined || value === null
}

function isObj (obj) {
  const type = typeof obj
  return obj !== null && (type === 'object' || type === 'function')
}

function get (obj, path) {
  const keys = path.split('.')
  let result = obj
  keys.forEach(element => {
    return isDef(obj[element]) ? result[element] : ''
  })
  return result
}

// const camelizeRE = /-(\w)/g
// function camelize(str) {
//   return ''
// }

function isAndroid () {
  return isServer ? false : /andorid/.test(navigator.userAgent.toLowerCase())
}

export {
  get,
  isObj,
  isDef,
  isServer,
  // camelize,
  isAndroid
}
