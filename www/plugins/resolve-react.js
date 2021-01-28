module.exports = () => ({
  name: 'resolve-react',
  configureWebpack() {
    return {
      devtool: 'inline-module-source-map',
      resolve: {
        alias: {
          react: require.resolve('react'),
          'react-dom$': require.resolve('react-dom'),
          'react-dom/server': require.resolve('react-dom/server'),
        },
      },
    }
  },
})
