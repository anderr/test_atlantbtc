import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/trader-dashboard',
    name: 'trader-dashboard',
    component: () =>
      import(
        /* webpackChunkName: "btc-monitoring" */ '../views/TraderDashboard.vue'
      )
  },
  {
    path: '/btc-monitoring',
    name: 'btc-monitoring',
    component: () =>
      import(
        /* webpackChunkName: "btc-monitoring" */ '../views/BtcMonitoring.vue'
      )
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
