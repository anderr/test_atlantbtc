import Vue from 'vue'
import Vuex from 'vuex'
import trader from './modules/trader'
import btc from './modules/btc'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    trader,
    btc
  }
})
