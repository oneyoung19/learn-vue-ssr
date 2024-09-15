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
  render: h => h(App),
  mounted () {
    if (window.__PRERENDER_INJECTED) {
      console.log('这个页面是预渲染页面')
      console.log('__PRERENDER_INJECTED', window.__PRERENDER_INJECTED)
    }
    window.setTimeout(() => {
      document.dispatchEvent(new Event('custom-render-trigger'))
      console.log('custom-render-trigger')
    }, 3000)
  }
})
