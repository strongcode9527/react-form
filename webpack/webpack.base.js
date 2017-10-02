const path = require('path') 


module.exports = {
  entry: {
    index: ['./src/script/index.js']
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