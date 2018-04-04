const path = require('path')
const { plugins, rules } = require('webpack-atoms')

module.exports = baseConfig =>
  Object.assign({}, baseConfig, {
    // mode: 'development',
    module: {
      rules: [
        { parser: { amd: false } },
        rules.js.inlineCss({ tagName: 'less', extension: '.less' }),
        rules.css(),
        rules.less(),
        rules.images(),
        rules.fonts(),
      ],
    },
    resolve: {
      symlinks: false,
      alias: {
        'react-widgets$': path.resolve('../react-widgets/src/index.js'),
        'react-widgets/lib': path.resolve('../react-widgets/src'),

        'react-widgets-virtualized$': path.resolve(
          '../virtualized/src/index.js'
        ),
        'react-widgets-virtualized/lib': path.resolve('../virtualized/src'),

        'react-widgets-material-ui$': path.resolve(
          '../material-ui/src/index.js'
        ),
        'react-widgets-material-ui/lib': path.resolve('../material-ui/src'),
      },
    },
    plugins: [
      plugins.define(),
      plugins.extractText({ disable: true }),
      plugins.hotModuleReplacement(),
      ...baseConfig.plugins,
    ],
    node: {
      Buffer: false,
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
    },
  })
