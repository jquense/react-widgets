const path = require('path')
module.exports = () => {
  return {
    name: 'tailwindcss-loader',
    configureWebpack(_, isServer, { getBabelLoader }) {
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
        resolve: {
          alias: {
            // react: require.resolve('react'),
            // 'react-dom$': require.resolve('react-dom'),
            // 'react-dom/server': require.resolve('react-dom/server'),
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
