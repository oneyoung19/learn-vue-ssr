const http = require('node:http')
const path = require('node:path')
const fs = require('node:fs')

const { globSync } = require('glob')
// const { getRouteTemplate } = require('../views/template/index')
// const { createApp } = require('./scripts/app')
// const { createApp } = require('../views/vue2/app')
// const renderer = require('vue-server-renderer').createRenderer({
//   template: fs.readFileSync(path.resolve(__dirname, '../views/vue2/public/index.html'), 'utf-8')
// })
const serverBundle = require('./server/vue-ssr-server-bundle.json')
const clientManifest = require('./client/vue-ssr-client-manifest.json')
const { createBundleRenderer } = require('vue-server-renderer')
const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false,
  template: fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf-8'),
  clientManifest
})

const staticPath = path.resolve(__dirname, './client')
const staticFiles = globSync(['dist/client/**/*'], { nodir: true }).map(path => path.replace(/^dist\/client/, ''))

const config = {
  title: 'Vue SSR',
  meta: '<meta name="description" content="Vue.js 服务端渲染"><meta name="keywords" content="Vue,SSR">'
}

const server = http.createServer(async (req, res) => {
  let { url } = req
  // if (url === '/') {
  //   url = '/home'
  // }
  if (staticFiles.includes(url)) {
    res.end(fs.readFileSync(path.resolve(staticPath, `.${url}`)))
    return
  }
  // const routeContent = getRouteTemplate(url.slice(1))
  // const app = createApp(req)
  const context = { url: req.url, ...config }
  renderer.renderToString(context, (err, html) => {
    console.log('err', err)
    if (err) {
      if (err.code === 404) {
        res.end('Page not found')
      } else {
        res.end('Internal Server Error')
      }
    } else {
      res.end(html)
    }
  })
  // if (routeContent) {
  //   res.end(routeContent)
  //   return
  // }
  // res.end('Vanilla')
  // const context = { url: req.url }
  // // 这里无需传入一个应用程序，因为在执行 bundle 时已经自动创建过。
  // // 现在我们的服务器与应用程序已经解耦！
  // renderer.renderToString(context, (err, html) => {
  //   // 处理异常……
  //   res.end('Vanilla')
  // })
})

server.listen(6801, () => {
  console.log('Server is running on http://127.0.0.1:6801')
})
