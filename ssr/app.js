import Vue from 'vue'
import App from '../src/App.vue'
import { createRouter } from '../src/router'
import { createStore } from '../src/store'
import { sync } from 'vuex-router-sync'

export function createApp() {
  const router = createRouter()
  const store = createStore()

  sync(store, router)

  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })
  return {
    app,
    router,
    store
  }
}
