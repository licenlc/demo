import Vue from 'vue'
import DvDialog from './Dialog'

let instance

const initInstance = () => {
  instance = new (Vue.extend(DvDialog))({
    el: document.createElement('div')
  })
  console.log(instance)
  instance.$on('input', value => {
    instance.value = value
  })
  document.body.appendChild(instance.$el)
}

const Dialog = options => {
  if (!instance) {
    initInstance()
  }
  Object.assign(instance, options)
}

Dialog.defaultOpts = {
  content: '内容区',
  cancelText: '取消',
  okText: '确定',
  title: '标题1111',
  overlay: true,
  value: true,
  success: () => {}
}

Dialog.alert = options => Dialog({
  ...Dialog.defaultOpts,
  ...options
})

Dialog.alert = options => Dialog({
  ...Dialog.defaultOpts,
  ...options
})

Dialog.install = () => {
  console.log('dvdialog')
  Vue.use(DvDialog)
}

Vue.prototype.$dialog = Dialog
export default Dialog
