const path = require('node:path')
const { VueLoaderPlugin } = require('vue-loader')
const CopyWebpackPlugin = require('copy-webpack-plugin')

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
        {
          from: path.resolve(__dirname, '../server.js'),
          to: path.resolve(__dirname, '../dist/server.js')
        },
      ]
    })
  ]
}
