const http = require('node:http')
const Vue = require('vue')
const renderer = require('vue-server-renderer').createRenderer()

const server = http.createServer((req, res) => {
  const { url } = req
  const app = new Vue({
    data: {
      url
    },
    template: `<div>{{ url }}</div>`
  })
  renderer.renderToString(app).then(html => {
    res.end(html)
  })
})

server.listen(8000, () => {
  console.log('server is running at http://localhost:8000')
})
