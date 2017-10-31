const path = require('path')
const slug = require('slug')

const GraphQLJSON = require('graphql-type-json')


exports.modifyWebpackConfig = ({
  boundActionCreators,
  rules,
}) => {
  const { setWebpackConfig } = boundActionCreators;

  const noAmdRule = {
    test: /\.js$/,
    loader: `imports-loader?` +
     `define=>false,` +
     `__VERSION__=>"${require('../packages/react-widgets/package.json').version}"`,
  }

  setWebpackConfig({
    module: {
      rules: [
        Object.assign(rules.js(), {
          use: {
            options: { extension: '.less', tagName: 'less' },
            loader: require.resolve('css-literal-loader'),
          }
        }),
        noAmdRule,
      ]
    },
    resolve: {
      symlinks: false,
      alias: {
        globalize: path.resolve('./node_modules/globalize'),
        'react': path.resolve('./node_modules/react'),
        'react-dom': path.resolve('./node_modules/react-dom'),
        'react-widgets$': require.resolve('../packages/react-widgets/src/index.js'),
        'react-widgets/lib': path.resolve('../packages/react-widgets/src')
      },
    }
  })
};


exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators

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
          return;
        }

        const componentTemplate = path.resolve(`src/templates/component.js`)
        const publicComponents = result.data.allComponentMetadata.edges
          .filter(({ node }) => node.doclets.public)
          .map(e => e.node.displayName)

        publicComponents.forEach((displayName) => {
            createPage({
              path: `/api/${slug(displayName)}/`,
              component: componentTemplate,
              context: {
                displayName,
                publicComponents,
              },
            })
        })
      })
    )
  })
}

GraphQLJSON.name = 'JSON_2';

exports.setFieldsOnGraphQLNodeType = ({ type }) => {
  if (type.name === 'ComponentProp' || type.name === 'ComponentMetadata')
    return {
      doclets: {
        type: GraphQLJSON
      }
    }

  return {}
}
