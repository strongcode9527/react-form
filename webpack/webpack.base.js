var path = require('path')

module.exports = {
  entry: {
    index: ['react-hot-loader/patch','./src/script/index.js']
  },
  output: {
    path: path.resolve(__dirname,'dist'),
    filename: './script/bundle-[hash].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['react-hot-loader','babel-loader','eslint-loader']
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
  }
}