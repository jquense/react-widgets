
exports.resolvableExtensions = () => ['.md'];

exports.modifyWebpackConfig = ({ boundActionCreators, loaders }) => {
  const { setWebpackConfig } = boundActionCreators;

  setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.md$/,
          use: [
            loaders.js(),
            require.resolve('./loader')
          ]
        },
      ]
    },
  })
};
