const webpack = require('webpack'),
  merge = require('webpack-merge'),
  baseConfig = require('./webpack.base.js'),  
  HtmlWebpackPlugin = require('html-webpack-plugin')

  
var config = merge(
  baseConfig, {
    plugins: [
      new HtmlWebpackPlugin({
        template: 'index.html'
      }),
      new webpack.HotModuleReplacementPlugin()
    ],
    devtool: 'inline-source-map',
  }
)



module.exports = config