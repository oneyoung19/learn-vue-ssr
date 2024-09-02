// store.js
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    state: {
      items: {}
    },
    actions: {
      fetchItem ({ commit }, id) {
        // `store.dispatch()` 会返回 Promise，
        // 以便我们能够知道数据在何时更新
        if (id) {
          return axios({
            methods: 'GET',
            url: `https://hn.algolia.com/api/v1/items/${id}`
          }).then(res => {
            const { author } = res.data
            console.log('author', author)
            commit('setItem', { id, item: { author } })
          })
        } else {
          return Promise.resolve('No ID')
        }
      }
    },
    mutations: {
      setItem (state, { id, item }) {
        Vue.set(state.items, id, item)
      }
    }
  })
}