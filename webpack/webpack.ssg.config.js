const path = require('node:path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.config.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer

const entry = path.resolve(__dirname, '../ssg/app.js')

module.exports = merge(baseConfig, {
  mode: 'production',
  entry,
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].[chunkhash:4].js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new HtmlWebpackPlugin({
      title: 'PRODUCTION prerender-spa-plugin',
      template: path.resolve(__dirname, '../public/index.html'),
      // filename: path.resolve(__dirname, 'dist/index.html'),
      favicon: path.resolve(__dirname, '../public/favicon.ico')
    }),
    new PrerenderSPAPlugin({
      staticDir: path.join(__dirname, '../dist'),
      routes: [ '/', '/about' ],

      renderer: new Renderer({
        inject: {
          foo: 'bar'
        },
        headless: true,
        renderAfterDocumentEvent: 'render-event'
      })
    })
  ]
})
