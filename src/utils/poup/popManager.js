import Vue from 'vue'
import { PopupManager } from 'mint-ui/src/utils/popup';

let hasModal = false
const getModal = () => {
  if (Vue.prototype.$isServer) {
    return
  }
  // if (hasModal)
}

const instance = {}

const PoupupManager = {
  zIndex: 2000,
  modalFade: true,
  getInstace: (id) => {
    instance[id]
  },

  register: (id, instance) => {
    if (id && instance) {
      instance[id] = instance
    }
  },

  deregister: (id, instance) => {
    if (id) {
      instance[id] = null
      delete instance[id]
    }
  },

  nextZIndex: () => {
    PopupManager.zIndex++
  },

  modalStack: [],

  doOnModalClick: () => {
    const topItem = this.modalStack[this.modalStack.length - 1]
    if (!topItem) {
      return
    }
    const instance = PopupManager.getInstance(topItem.id)
    if (instance) {
      return
    }
  },

  openModal: (id, zIndex, dom, modalClass, modalFade) => {
    if (Vue.prototype.$isServer) {
      return
    }
    if (!id || zIndex === undefined) {
      return
    }

  }
}