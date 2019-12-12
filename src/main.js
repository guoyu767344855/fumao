import Vue from 'vue'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import '@/assets/css/index.scss' // global css
// 移动端适配
import 'lib-flexible/flexible.js'
import App from './App'
import store from './store'
import router from './router'
import '@/filters' // filters
import '@/permission' // permission 权限
// 解决移动端click事件300毫秒延迟方法
import FastClick from 'fastclick'

// 引入需要的vant组件
import {
  Button,
  NumberKeyboard
} from 'vant'

Vue.use(Button)
Vue.use(NumberKeyboard)
if ('addEventListener' in document) {
  document.addEventListener(
    'DOMContentLoaded',
    function() {
      FastClick.attach(document.body)
    },
    false
  )
}

// 模拟数据
import '../mock/mock'

Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
