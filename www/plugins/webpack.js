const path = require('path')

module.exports = () => {
  const TAILWIND_CONFIG = require.resolve('../tailwind.config.js')

  return {
    name: 'tailwindcss-loader',
    configurePostCss(postcssOptions) {
      console.log('ASFASfasfsfs')
      postcssOptions.plugins.push(require('tailwindcss')(TAILWIND_CONFIG))
      postcssOptions.plugins.push(require('autoprefixer'))
      return postcssOptions
    },
    configureWebpack(_, isServer, { getStyleLoaders, getJSLoader }) {
      const isProd = process.env.NODE_ENV === 'production'
      return {
        devtool: isProd ? 'source-map' : 'inline-source-map',
        module: {
          rules: [
            {
              test: /\.(j|t)sx?$/,
              include: [/packages\/react-widgets\/src/],
              use: [
                getJSLoader(
                  isServer,
                  path.resolve(__dirname, '../babel.config.js'),
                ),
              ],
            },
            {
              test: /\.s[ca]ss$/,
              use: [...getStyleLoaders(isServer), 'sass-loader'],
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
