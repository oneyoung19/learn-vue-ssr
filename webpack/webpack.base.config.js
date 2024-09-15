const path = require('node:path')
const { VueLoaderPlugin } = require('vue-loader')
// 统计信息
const { StatsWriterPlugin } = require('webpack-stats-plugin')
// Manifest清单
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')
// 删除assets
const RemoveAssetsPlugin = require('@automattic/remove-asset-webpack-plugin')

module.exports = {
  output: {
    clean: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src')
    },
    extensions: ['.js', '.vue']
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      // {
      //   test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      //   loader: 'url-loader',
      //   options: {
      //     limit: 10000,
      //     name: '[name].[hash:4].[ext]',
      //     outputPath: 'img'
      //   }
      // },
      // {
      //     test: /(\.(eot|ttf|woff|woff2|otf)|font)$/,
      //     loader: 'file-loader',
      //     options: { outputPath: 'fonts/' }
      // },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[hash:4].[ext]',
          outputPath: 'img',
          // 设置该属性 保证图片正常解析
          esModule: false
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    // new StatsWriterPlugin({
    //   stats: {
    //     all: true
    //   },
    //   // transform (data, opts) {
    //   //   const { assets, ...props } = data
    //   //   return JSON.stringify({
    //   //     ...props,
    //   //     assets: assets.map(item => {
    //   //       if (item.type === 'assets by path') {
    //   //         const { children, ...rest } = item
    //   //         return {
    //   //           ...rest,
    //   //           children: children.filter(child => child.name !== '../server.js')
    //   //         }
    //   //       }
    //   //       return item
    //   //     })
    //   //   }, null, 2)
    //   // }
    // }),
    // new WebpackManifestPlugin({
    //   filter (fileDescriptor) {
    //     // return fileDescriptor.name !== '../server.js'
    //     return true
    //   }
    // }),
    // Not work. Server.js is still in vue-ssr-client-manifest.json.
    // new RemoveAssetsPlugin({
    //   assets: [
    //     // '../server.js'
    //   ]
    // })
  ]
}
