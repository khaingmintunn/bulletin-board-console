import './polyfill'
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import DotEnv from 'dotenv/config'
import * as VeeValidate from 'vee-validate'
import miniToastr from 'mini-toastr'
import VueNotifications from 'vue-notifications'
import { router } from './router'
import { store } from './store'

const toastTypes = {
  success: 'success',
  error: 'error',
  info: 'info',
  warn: 'warn',
}
miniToastr.init({ types: toastTypes })

function toast({ title, message, type, timeout, cb }) {
  return miniToastr[type](message, title, timeout, cb)
}

const options = {
  success: toast,
  error: toast,
  info: toast,
  warn: toast,
}

Vue.use(BootstrapVue)
Vue.use(DotEnv)
Vue.use(VeeValidate, {
  inject: true,
  fieldsBagName: 'inputs',
  errorBagName: 'verror',
})
Vue.use(VueNotifications, options)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App,
  },
})
