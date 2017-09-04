const path = require('path')
const slug = require('slug')

const GraphQLJSON = require('graphql-type-json')

exports.resolvableExtensions = () => ['.md'];

exports.modifyWebpackConfig = (
  { boundActionCreators, getConfig, stage, rules, loaders },
) => {
  // const currentConfig = getConfig()
  const { setWebpackConfig } = boundActionCreators;


  const jsxtremeRule = {
    test: /\.md$/,
    use: [
      loaders.js(),
      require.resolve('./jsxtreme-markdown')
    ]
  }
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
        jsxtremeRule,
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


  // console.log(getConfig().module.rules[6])
  // config.loader('js-2', {
  //   test: /\.js$/,
  //   loader: 'css-literal-loader',
  //   query: { extension: '.less', tagName: 'less' }
  // })

  // config.loader('js', (current) => {
  //   config.loader('jsxtreme', {
  //     test: /\.md$/,
  //     loader: current.loader,
  //     query: current.query,
  //   })
  //   config.loader('jsxtreme-2', {
  //     test: /\.md$/,
  //     loader: require.resolve('./jsxtreme-markdown'),
  //   })
  //   return current;
  // })



  // switch (stage) {
  //   case `build-css`:
  //     config.loader(`less`, {
  //       test: /\.less$/,
  //       loader: ExtractText.extract([`css-loader`, `less-loader`]),
  //     })
  //     break;
  //   case 'build-html':
  //   case 'build-javascript':
  //     config.loader(`less`, {
  //       test: /\.less$/,
  //       loader: 'null-loader',
  //     })
  //     break;
  //   default:
  //     config.loader(`less`, {
  //       test: /\.less$/,
  //       loaders: [`style-loader`, `css-loader`, `less-loader`]
  //     })
  // }

  // config.merge({
  //   resolve: {
  //     alias: {
  //       globalize: path.resolve('./node_modules/globalize'),
  //     },
  //     // modulesDirectories: [
  //     //   `node_modules`,
  //     //   path.resolve(__dirname, 'node_modules/gatsby/node_modules'),
  //     // ]
  //   },
  //   node: {
  //     Buffer: false,
  //     fs: 'empty',
  //     net: 'empty',
  //     tls: 'empty',
  //   },
  // })

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
        result.data.allComponentMetadata.edges.forEach(({ node }) => {
          if (node.doclets.public) {
            createPage({
              path: `/api/${slug(node.displayName)}/`,
              component: componentTemplate,
              context: {
                displayName: node.displayName,
              },
            })
          }
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
