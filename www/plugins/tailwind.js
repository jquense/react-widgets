module.exports = () => {
  return {
    name: 'tailwindcss-loader',
    configureWebpack() {
      return {
        module: {
          rules: [
            {
              test: /\.css$/,
              use: [
                {
                  loader: require.resolve('postcss-loader'),
                  options: {
                    plugins: () => [require('tailwindcss')],
                  },
                },
              ],
            },
          ],
        },
      }
    },
  }
}
