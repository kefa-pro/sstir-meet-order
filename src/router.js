import Vue from 'vue'
import Router from 'vue-router'
import Order from './views/order'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'order',
      component: Order
    },
    {
      path: '/admin-sstir',
      name: 'admin',
      component: () => import(/* webpackChunkName: "admin" */ './views/admin')
    }
  ]
})
