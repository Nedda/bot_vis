 var path = require('path');
 var vis = require('vis');

 module.exports = {
   entry: './lib/app.js',
   output: {
     path: __dirname,
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
