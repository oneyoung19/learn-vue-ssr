const http = require('node:http')
const path = require('node:path')
const fs = require('node:fs')

const Vue = require('vue')
const renderer = require('vue-server-renderer').createRenderer({
  template: fs.readFileSync(path.resolve(__dirname, '../public/index.html'), 'utf-8')
})

const context = {
  title: 'Vue SSR',
  meta: '<meta name="description" content="Vue.js 服务端渲染"><meta name="keywords" content="Vue,SSR">'
}

/*
模板中的原生指令和方法是支持的 但在客户端无反应

自定义指令，也没有生效
*/
const server = http.createServer((req, res) => {
  const { url } = req
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
  renderer.renderToString(app, context).then(html => {
    res.end(html)
  })
})

server.listen(8000, () => {
  console.log('server is running at http://localhost:8000')
})
