const path = require('path')
const { plugins, rules } = require('webpack-atoms')

module.exports = ({ config }) =>
  Object.assign({}, config, {
    // mode: 'development',
    devtool: 'inline-module-source-map',
    module: {
      rules: [
        { parser: { amd: false } },
        rules.js({
          extends: '../../.babelrc.js',
        }),
        rules.astroturf({ extension: '.scss' }),
        rules.css(),
        rules.sass(),
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
          '../virtualized/src/index.js',
        ),
        'react-widgets-virtualized/lib': path.resolve('../virtualized/src'),

        'react-widgets-material-ui$': path.resolve(
          '../material-ui/src/index.js',
        ),
        'react-widgets-material-ui/lib': path.resolve('../material-ui/src'),
        'react-widgets-globalize-old': path.resolve(
          '../localizer-globalize-old/localizer.js',
        ),
      },
    },
    plugins: [
      plugins.define(),
      plugins.extractCss({ disable: true }),
      ...config.plugins,
    ],
    node: {
      Buffer: false,
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
    },
  })
