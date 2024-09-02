import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export function createRouter () {
  return new Router({
    mode: 'history',
    routes: [
      {
        name: 'Home',
        path: '/',
        meta: {
          title: 'Home'
        },
        component: () => import('../pages/Home.vue')
      },
      {
        name: 'About',
        path: '/about',
        meta: {
          title: 'About'
        },
        component: () => import(/* webpackChunkName: "about" */ '../pages/About.vue')
      }
    ]
  })
}
