// const path = require('path')
const templates = require('@docpocalypse/gatsby-theme/src/templates')

module.exports = {
  siteMetadata: {
    title: 'React Widgets documentation',
    author: 'Jason Quense',
  },
  plugins: [
    {
      resolve: '@docpocalypse/gatsby-theme',
      options: {
        theming: 'full',
        sources: ['../packages/react-widgets/src'],
        templates: {
          ...templates,
          default: require.resolve('./src/components/PageLayout.tsx'),
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
