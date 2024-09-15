const path = require('node:path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.config.js')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

const entry = path.resolve(__dirname, '../ssr/entry-client.js')

module.exports = merge(baseConfig, {
  mode: 'production',
  entry,
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, '../dist/client'),
    filename: 'js/[name].[chunkhash:4].js'
  },
  plugins: [
    // 重要信息：这将 webpack 运行时分离到一个引导 chunk 中，
    // 以便可以在之后正确注入异步 chunk。
    // 这也为你的 应用程序/vendor 代码提供了更好的缓存。
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'manifest',
    //   minChunks: Infinity
    // }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../public/favicon.ico'),
          to: path.resolve(__dirname, '../dist/client/favicon.ico')
        },
        {
          from: path.resolve(__dirname, './template/index.html'),
          to: path.resolve(__dirname, '../dist/index.html')
        },
        {
          from: path.resolve(__dirname, '../ssr/server.js'),
          to: path.resolve(__dirname, '../dist/server.js')
        }
      ]
    }),
    // 此插件在输出目录中
    // 生成 `vue-ssr-client-manifest.json`。
    new VueSSRClientPlugin(),
    new webpack.DefinePlugin({
      'process.env.VUE_ENV': '"client"'
    })
  ]
})
