var webpack = require('webpack'),
  webpackConfig = require('../webpack/webpack.config'),
  compile = webpack(webpackConfig),
  webpackDevServer = require('webpack-dev-server')
 
var options = {
  hot: true,
  hotOnly: true,
  contentBase: '/'
}

webpackDevServer.addDevServerEntrypoints(webpackConfig, options);

var server = new webpackDevServer(compile, options)



server.listen(3001, err => {
  console.log('in server')
})