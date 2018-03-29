import Vue from 'vue'
import Button from '@/components/button'
import Dialog from '@/components/dialog'
// import Button from '@/components/button'
// import Toast from '@/components/toast'

const install = Vue => {
  Vue.use(Dialog)
  // Vue.use(Toast)
}
// install(Vue)
Vue.use(Button)

if (typeof window !== 'undefined' && window.Vue) {
  window.install(window.Vue)
}

export {
  install,
  Dialog,
  // Toast,
  Button
}
export default {
  install
}
