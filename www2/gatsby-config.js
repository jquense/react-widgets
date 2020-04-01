// const path = require('path')

const publicComponents = [
  'Calendar',
  'Combobox',
  'DateTimePicker',
  'DropdownList',
  'Multiselect',
  'NumberPicker',
  'Listbox',
]

module.exports = {
  siteMetadata: {
    title: 'React Widgets documentation',
    author: 'Jason Quense',
  },
  plugins: [
    'gatsby-plugin-sass',
    {
      resolve: '@docpocalypse/gatsby-theme',
      options: {
        theming: 'full',
        propsLayout: 'list',
        sources: ['../packages/react-widgets/src'],
        exampleCodeScope: {
          listOfPeople: require.resolve('./src/generate-data'),
        },
        ignore(docNode) {
          return !publicComponents.includes(docNode.name)
        },
        tailwindConfig: require.resolve('./tailwind.config'),
        reactDocgenConfig: {
          handlers: [require('./tools/doc-handler')],
        },
      },
    },
    {
      resolve: `gatsby-plugin-webfonts`,
      options: {
        fonts: {
          google: [
            {
              family: 'Lobster',
            },
            {
              family: 'Raleway',
              variants: [400, 700, 800, 900],
            },
          ],
        },
      },
    },
  ],
}
