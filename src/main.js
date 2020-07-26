import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vant/lib/index.css'
import "@/utils/vantui"

//全局过滤器，过滤价格
Vue.filter("filterMoney", (val) => {
  return "¥" + val.toFixed(2) + "元"
})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
