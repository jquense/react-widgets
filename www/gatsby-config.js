const path = require('path');
const { cleanDoclets } = require('gatsby-transformer-react-docgen/Doclets')

const defaultDescriptions = require('./language')
const defaultTypes = require('./types')

function setDefaults(desc, name, widgetName) {
  let type = desc.type;
  let typeName = type && type.raw &&
  type.raw.replace('CustomPropTypes.', '');

  if (type && type.name === 'shape' && type.value) {
    Object.keys(type.value).forEach((key) => {
      type.value[key] = setDefaults({ type: type.value[key] }, key, widgetName).type
    })
  }

  if (defaultTypes[typeName]) {
    desc.type = Object.assign({}, type, defaultTypes[typeName]);
  }

  if (defaultDescriptions[name]) {
    let dft = defaultDescriptions[name]
    if (!cleanDoclets(desc.description)) {
      desc.description = dft({ name: widgetName }) + '\n' + desc.description || '';
    }
  }

  return desc
}


module.exports = {
  pathPrefix: `/react-widgets`,
  siteMetadata: {
    title: 'React Widgets Documentation',
    author: 'Jason Quense',
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: path.join(__dirname, 'src/pages'),
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: path.join(__dirname, '../packages/react-widgets/src'),
        name: 'components',
      },
    },
    'gatsby-plugin-less',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-prismjs',
        ],
      },
    },
    { resolve: 'gatsby-plugin-jsxtreme-markdown' },
    {
      resolve: 'gatsby-transformer-react-docgen',
      options: {
        handlers: [
          function defaultDescriptionsHandler(docs) {
            let widgetName = docs.get('displayName');
            docs._props.forEach((_, name) => {
              let desc = docs.getPropDescriptor(name);

              setDefaults(desc, name, widgetName);
            });
          }
        ]
      },
    },
  ]
};
