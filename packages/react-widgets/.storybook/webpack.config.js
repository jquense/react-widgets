var path = require('path')
var appConfig = require('../../../tools/app-config');

module.exports = appConfig(path.resolve(__dirname, '../'), {
  resolve: {
    alias: {
      'react-widgets$': require.resolve('../src/index.js'),
      'react-widgets/lib': path.resolve(__dirname, '../src')
    }
  }
})
