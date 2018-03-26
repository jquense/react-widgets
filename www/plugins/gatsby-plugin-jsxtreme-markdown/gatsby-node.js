exports.resolvableExtensions = () => ['.md']

exports.onCreateWebpackConfig = ({ actions, loaders }) => {
  const { setWebpackConfig } = actions

  setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.md$/,
          use: [loaders.js(), require.resolve('./loader')],
        },
      ],
    },
  })
}
