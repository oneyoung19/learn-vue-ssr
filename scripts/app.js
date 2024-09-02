const http = require('node:http')
const path = require('node:path')
const fs = require('node:fs')

const Vue = require('vue')

const createApp = (context) => {
  const { url } = context
  const app = new Vue({
    data: {
      url,
      num: 0
    },
    template: `<div>
    <p v-red>{{ url }}</p>
    <p v-show="num > 0">{{ num }}</p>
    <button @click="handleClick">Add num</button>
    </div>`,
    methods: {
      handleClick() {
        this.num++
      }
    },
    directives: {
      red: {
        inserted(el) {
          el.style.color = 'red'
        }
      }
    }
  })
  return app
}

module.exports = {
  createApp
}
