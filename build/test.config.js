var makeConfig = require('./make-config');

module.exports = makeConfig({

  devtool: 'inline-source-map',

  loaders: [
    { test: /sinon-chai/, loader: 'imports?define=>false' }
  ]
})
