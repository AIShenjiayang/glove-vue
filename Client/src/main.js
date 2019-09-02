import Vue from 'vue'
import layer from 'vue-layer'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/permission' // permission control

import '../static/ueditor/ueditor.config.js'
import '../static/ueditor/ueditor.all.min.js'
import '../static/ueditor/lang/zh-cn/zh-cn.js'
import '../static/ueditor/ueditor.parse.min.js'
import '../static/ueditor/formdesign/leipi.formdesign.v4.js'
import '../static/flow/GooFlow.js'
import '../static/flow/GooFunc.js'

Vue.use(ElementUI, { locale })

Vue.config.productionTip = false
Vue.prototype.$layer = layer(Vue, {
  msgtime: 3
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
