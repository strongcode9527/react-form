var webpack = require('webpack')
var merge = require('webpack-merge')
var baseConfig = require('./webpack.base.js')
var HtmlWebpackPlugin = require('html-webpack-plugin')

var config = merge(
  baseConfig, {
    plugins: [
      new HtmlWebpackPlugin({
        template: 'index.html'
      }),
      new webpack.HotModuleReplacementPlugin(),
    ]
  }
)

Object.keys(config.entry).forEach(item => config.entry[item] = ['webpack-hot-middleware/client'].concat(config.entry[item]))
console.log(Object.keys(config.entry))
console.log('config', config)

module.exports = config