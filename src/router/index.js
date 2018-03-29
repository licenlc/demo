import Vue from 'vue'
import Router from 'vue-router'
import InputDemo from '@/example/InputDemo'
import Index from '@/example/Index'
import Switch from '@/example/SwitchDemo'
import Picker from '@/example/Picker'
import As from '@/example/As'
import Tab from '@/example/Tab'
import Toast from '@/example/Toast'
import dialog from '@/example/dialog'
import ScreenPage from '@/example/ScreenPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/input',
      name: 'InputDemo',
      component: InputDemo
    },
    {
      path: '/dialog',
      name: 'dialog',
      component: dialog
    },
    {
      path: '/switch',
      name: 'Switch',
      component: Switch
    },
    {
      path: '/action',
      name: 'As',
      component: As
    },
    {
      path: '/picker',
      name: 'Picker',
      component: Picker
    },
    {
      path: '/tab',
      name: 'Tab',
      component: Tab
    },
    {
      path: '/toast',
      name: 'Toast',
      component: Toast
    },
    {
      path: '/screenPage',
      name: 'ScreenPage',
      component: ScreenPage
    }
  ]
})
