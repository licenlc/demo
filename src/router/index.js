import Vue from 'vue'
import Router from 'vue-router'
import InputDemo from '@/example/InputDemo'
import Index from '@/example/Index'
import Switch from '@/example/SwitchDemo'
import Picker from '@/example/Picker'
import DatePicker from '@/example/DatePicker'
import As from '@/example/As'
import Tab from '@/example/Tab'
import Toast from '@/example/Toast'
import dialog from '@/example/dialog'
import ScreenPage from '@/example/ScreenPage'
import SwiperDemo from '@/example/SwiperDemo'
import BackToTop from '@/example/BackToTop'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/swiper',
      name: 'SwiperDemo',
      component: SwiperDemo
    },
    {
      path: '/backToTop',
      name: 'BackToTop',
      component: BackToTop
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
      path: '/datePicker',
      name: 'datePicker',
      component: DatePicker
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
