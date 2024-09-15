const path = require('node:path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.config.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const PrerenderSPAPlugin = require('prerender-spa-plugin')
// const Renderer = PrerenderSPAPlugin.PuppeteerRenderer
const PrerendererWebpackPlugin = require('@prerenderer/webpack-plugin')

const entry = path.resolve(__dirname, '../ssg/app.js')

module.exports = merge(baseConfig, {
  mode: 'production',
  entry,
  output: {
    // 指定publicPath以保证SSG的静态资源路径正确
    publicPath: '/',
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].[chunkhash:4].js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
      'process.env.VUE_ENV': '"SSG"'
    }),
    new HtmlWebpackPlugin({
      title: 'PRODUCTION prerender-spa-plugin',
      template: path.resolve(__dirname, '../public/index.html'),
      filename: path.resolve(__dirname, '../dist/index.html'),
      favicon: path.resolve(__dirname, '../public/favicon.ico')
    }),
    // Maybe not work in webpack@5
    // new PrerenderSPAPlugin({
    //   staticDir: path.resolve(__dirname, '../dist'),
    //   routes: [ '/', '/about' ],

    //   renderer: new Renderer({
    //     inject: {
    //       foo: 'bar'
    //     },
    //     headless: true,
    //     renderAfterDocumentEvent: 'render-event'
    //   })
    // }),
    // injectProperty inject not work...
    new PrerendererWebpackPlugin({
      // indexPath: path.resolve(__dirname, '../dist'),
      routes: ['/', '/about', '/about/child'],
      // renderer: '@prerenderer/renderer-puppeteer',
      // renderer: '@prerenderer/renderer-jsdom',
      rendererOptions: {
        // headless: false,
        // renderAfterDocumentEvent: 'render-event',
        injectProperty: '__PRERENDER_INJECTED',
        inject: {
          foo: 'bar' // window.__PRERENDER_INJECTED.foo
        },
        // Optional - Wait to render until the specified event is dispatched on the document.
        // eg, with `document.dispatchEvent(new Event('custom-render-trigger'))`
        renderAfterDocumentEvent: 'custom-render-trigger',

        // Optional - Wait to render until the specified element is detected using `document.querySelector`
        // renderAfterElementExists: 'my-app-element',
        timeout: 10000,
      }
    })
  ]
})
