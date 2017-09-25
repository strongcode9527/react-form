var webpack = require('webpack'),
  webpackConfig = require('../webpack/webpack.config'),
  compile = webpack(webpackConfig),
  webpackDevMiddleware = require('webpack-dev-middleware'),
  express = require('express'),
  app = express(),
  opn = require('opn'),
  webpackHotMiddleware = require('webpack-hot-middleware'),
  http = require('http'),
  reload = require('reload')

app.use(webpackDevMiddleware(compile, {
  publicPath: '/'
}))

app.use(webpackHotMiddleware(compile))

var server = http.createServer(app) 
reload(server, app)

server.listen(3000, function() {
  opn('http:\\localhost:3000')
});