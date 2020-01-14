const path = require('path')
const slug = require('slug')

exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelOptions({
    options: {
      rootMode: 'upward',
    },
  })
}

exports.onCreateWebpackConfig = ({ actions, rules, plugins, getConfig }) => {
  const { setWebpackConfig } = actions

  const noAmdRule = {
    test: /\.js$/,
    loader:
      `imports-loader?` +
      `define=>false,` +
      `__VERSION__=>"${
        require('../packages/react-widgets/package.json').version
      }"`,
  }

  setWebpackConfig({
    module: {
      rules: [rules.astroturf({ enableCssProp: true, extension: '.less' })],
    },
    resolve: {
      symlinks: false,
      alias: {
        globalize: path.resolve('./node_modules/globalize'),
        react: path.resolve('./node_modules/react'),
        'react-dom': path.resolve('./node_modules/react-dom'),
        'react-widgets$': require.resolve(
          '../packages/react-widgets/src/index.js',
        ),
        'react-widgets/lib': path.resolve('../packages/react-widgets/src'),
        'react-hot-loader': path.resolve('./node_modules/react-hot-loader'),
        'core-js': path.resolve('./node_modules/core-js'),
      },
    },
    plugins: [
      // See https://github.com/FormidableLabs/react-live/issues/5
      plugins.ignore(/^(xor|props)$/),
    ],
  })

  const current = getConfig()
  current.module.rules = current.module.rules.filter(r => r.enforce !== 'pre')
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    resolve(
      graphql(`
        {
          allComponentMetadata(limit: 1000) {
            edges {
              node {
                displayName
                doclets
              }
            }
          }
        }
      `).then(result => {
        if (result.errors) {
          reject(new Error(result.errors))
          return
        }

        const componentTemplate = path.resolve(`src/templates/component.js`)
        const publicComponents = result.data.allComponentMetadata.edges
          .filter(({ node }) => node.doclets.public)
          .map(e => e.node.displayName)

        publicComponents.forEach(displayName => {
          createPage({
            path: `/api/${slug(displayName)}/`,
            component: componentTemplate,
            context: {
              displayName,
              publicComponents,
            },
          })
        })
      }),
    )
  })
}
