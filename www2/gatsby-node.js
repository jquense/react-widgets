const path = require('path')
const { createAtoms } = require('webpack-atoms')

exports.onCreateWebpackConfig = function onCreateWebpackConfig({ actions }) {
  const { rules, plugins } = createAtoms({
    env: process.env.NODE_ENV || 'development',
  })

  actions.setWebpackConfig({
    module: {
      rules: [rules.astroturf({ enableCssProp: true })],
    },
    plugins: [
      plugins.define({
        __VERSION__: `"${
          require('../packages/react-widgets/package.json').version
        }"`,
      }),
    ],
    resolve: {
      symlinks: false,
      alias: {
        // react: path.resolve('./node_modules/react'),
        // 'react-dom': path.resolve('./node_modules/react-dom'),
        'react-widgets$': require.resolve(
          '../packages/react-widgets/src/index.js',
        ),
        'react-widgets/lib': path.resolve('../packages/react-widgets/src'),
      },
    },
  })
}

exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelOptions({
    options: {
      rootMode: 'upward',
    },
  })
}
