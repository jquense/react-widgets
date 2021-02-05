const path = require('path')
module.exports = () => {
  return {
    name: 'tailwindcss-loader',
    configureWebpack(_, isServer, { getStyleLoaders, getBabelLoader }) {
      return {
        devtool: 'inline-module-source-map',

        module: {
          rules: [
            {
              test: /\.(j|t)sx?$/,
              include: [/packages\/react-widgets\/src/],
              use: [
                getBabelLoader(
                  isServer,
                  path.resolve(__dirname, '../../babel.config.js'),
                ),
              ],
            },
            {
              test: /\.s[ca]ss$/,
              use: [...getStyleLoaders(isServer), 'sass-loader'],
            },
            {
              test: /\.css$/,
              use: [
                {
                  loader: 'postcss-loader',
                  options: {
                    plugins: () => [require('tailwindcss')],
                  },
                },
              ],
            },
          ],
        },
        resolve: {
          alias: {
            'react-widgets/styles.css': path.resolve(
              __dirname,
              '../../packages/react-widgets/lib/styles.css',
            ),
            'react-widgets': path.resolve(
              __dirname,
              '../../packages/react-widgets/src',
            ),
          },
        },
      }
    },
  }
}
