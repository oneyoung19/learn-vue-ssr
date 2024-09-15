import Vue from 'vue'
import App from '@/App.vue'
import { createRouter } from '@/router'
import { createStore } from '@/store'

const router = createRouter()
const store = createStore()

const app = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
