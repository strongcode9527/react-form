var webpack = require('webpack')
var merge = require('webpack-merge')
var baseConfig = require('./webpack.base.js')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

var config = merge(
  baseConfig, {
    plugins: [
      new HtmlWebpackPlugin({
        template: 'index.html'
      }),
      new webpack.HotModuleReplacementPlugin(),
      new OpenBrowserPlugin({ url: 'http://localhost:3001' }),
    ],
    devtool: 'inline-source-map',
  }
)

console.log(Object.keys(config.entry))
console.log('config', config)

module.exports = config