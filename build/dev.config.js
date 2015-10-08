var path = require('path')
  , makeConfig = require('./make-config');

module.exports = makeConfig({

  hot: false,

  production: false,

  devtool: 'source-map',

  entry:  path.join(__dirname, '../dev/dev.jsx'),

  loaders: [
    {
      test: /globalize/,
      loader: 'imports?define=>false'
    },
    {
      test: /cldr-data.+\.js$/,
      loader: 'imports?define=>false'
    }
  ],
  output: {
    filename: 'bundle.js',
    path: __dirname,
    publicPath: '/dev'
  }

})
