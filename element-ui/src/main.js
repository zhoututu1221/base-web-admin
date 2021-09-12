import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import tools from './config/tools'
import customAxios from './config/customAxios'
import qs from 'qs'
import jwt from 'jsonwebtoken'
import cookies from 'js-cookie'
import testData from './config/data'
import './assets/icon/iconfont.css'

Vue.config.productionTip = false

Vue.prototype.$qs = qs
Vue.prototype.$tools = tools
Vue.prototype.$http = customAxios
Vue.prototype.$jwt = jwt
Vue.prototype.$cookies = cookies
Vue.prototype.$testData = testData

Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
