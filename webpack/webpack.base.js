var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var webpack = require('webpack')

module.exports = {
  entry: {
    index: ['webpack-dev-server/client?http://localhost:3001/','./src/script/index.js']
  },
  output: {
    path: path.resolve(__dirname,'dist'),
    filename: './script/bundle-[hash].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader','eslint-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      }
    ]
  },
  devtool: 'inline-source-map',
}