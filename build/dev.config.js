var path = require('path')
  , makeConfig = require('./make-config');

module.exports = makeConfig({

  hot: false,

  production: false,

  devtool: 'source-map',

  entry:  path.join(__dirname, '../dev/dev.jsx'),

  output: {
    filename: 'bundle.js',
    path: __dirname,
    publicPath: '/dev'
  }

})
