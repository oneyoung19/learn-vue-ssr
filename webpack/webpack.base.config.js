const path = require('node:path')
const { VueLoaderPlugin } = require('vue-loader')
const CopyWebpackPlugin = require('copy-webpack-plugin')
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
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../public/favicon.ico'),
          to: path.resolve(__dirname, '../dist/client/favicon.ico')
        },
        {
          from: path.resolve(__dirname, '../public/index.html'),
          to: path.resolve(__dirname, '../dist/index.html')
        },
        // TODO: 研究一下插件，过滤掉该文件
        {
          from: path.resolve(__dirname, '../ssr/server.js'),
          to: path.resolve(__dirname, '../dist/server.js')
        }
      ]
    }),
    new StatsWriterPlugin({
      stats: {
        all: true
      },
      // transform (data, opts) {
      //   const { assets, ...props } = data
      //   return JSON.stringify({
      //     ...props,
      //     assets: assets.map(item => {
      //       if (item.type === 'assets by path') {
      //         const { children, ...rest } = item
      //         return {
      //           ...rest,
      //           children: children.filter(child => child.name !== '../server.js')
      //         }
      //       }
      //       return item
      //     })
      //   }, null, 2)
      // }
    }),
    new WebpackManifestPlugin({
      filter (fileDescriptor) {
        // return fileDescriptor.name !== '../server.js'
        return true
      }
    }),
    // Not work. Server.js is still in vue-ssr-client-manifest.json.
    new RemoveAssetsPlugin({
      assets: [
        // '../server.js'
      ]
    })
  ]
}
