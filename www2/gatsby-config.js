// const path = require('path')

module.exports = {
  siteMetadata: {
    title: 'React Widgets documentation',
    author: 'Jason Quense',
  },
  plugins: [
    {
      resolve: '@docpocalypse/gatsby-theme',
      options: {
        sources: ['../packages/react-widgets/src'],
      },
    },
  ],
}
