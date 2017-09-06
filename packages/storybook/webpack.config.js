var path = require('path')
var appConfig = require('../../tools/app-config');


module.exports = (baseConfig) => Object.assign({},
  baseConfig,
  appConfig(__dirname, {
    resolve: {
      symlinks: false,
      alias: {
        'react-widgets$': path.resolve('../react-widgets/src/index.js'),
        'react-widgets/lib': path.resolve('../react-widgets/src'),

        'react-widgets-virtualized$': path.resolve('../virtualized/src/index.js'),
        'react-widgets-virtualized/lib': path.resolve('../virtualized/src')
      }
    },
    plugins: [
      appConfig.plugins.hotModuleReplacement()
    ]
  })
)
