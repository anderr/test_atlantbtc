import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueLocalStorage from 'vue-localstorage'
import VueNativeSock from 'vue-native-websocket'

Vue.use(VueNativeSock, 'wss://ws.blockchain.info/inv', {
  format: 'json',
  connectManually: true
})
Vue.use(VueLocalStorage, {
  name: 'ls',
  bind: true
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
