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
      new OpenBrowserPlugin({ url: 'http://localhost:3001' }),
      new webpack.HotModuleReplacementPlugin()
    ],
    devtool: 'inline-source-map',
  }
)

module.exports = config