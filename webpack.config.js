var path = require('path');
var webpack = require('webpack');

console.log("MEOW", path.join(__dirname, "lib"));

module.exports = {
  entry: ['webpack/hot/dev-server',
    './lib/app.js'],
  output: {
    path: __dirname + '/bin',
    filename: '[name].bundle.js',
    publicPath: '/bin'
  },
  module: {
    loaders: [
      { test: /\.jsx$/,
        loader: 'babel-loader' }
    ]
  },
  devtool: 'sourcemap' 
};
