var path = require('path');
var webpack = require('webpack');
var plugins = new webpack.HotModuleReplacementPlugin();

module.exports = {
  entry: ['webpack/hot/dev-server',
    './lib/app.js'],
  output: {
    path: __dirname + '/bin',
    filename: 'bundle.js',
    publicPath: '/bin'
  },
  module: {
    loaders: [
      { test: path.join(__dirname, 'lib'),
        loader: 'babel-loader' }
    ]
  }
};
