var path = require('path')

var appConfig = require('../../tools/app-config');
var pkg = require('./package.json');

var TARGET = process.env.NODE_ENV || 'development';
var PRODUCTION = TARGET === 'production';

console.log( // eslint-disable-line
  '---------------------\n' +
  '-- env: ' + (TARGET) + '\n' +
  '---------------------\n'
);


var apiRegex = /\.api\.md$/;

var config = appConfig(__dirname, {
  cache: true,
  devtool: 'inline-module-source-map',

  entry:  './components/Docs.js',

  output: {
    path: __dirname,
    filename: '[name].js',
    publicPath: '/'
  },

  module: {
    rules: [
      {
        test: apiRegex,
        use: [
          ...appConfig.loaders.js(),
          {
            loader: path.join(__dirname, './tools/apiLoader'),
            options: {
              template: require.resolve('./templates/doc-page')
            }
          },
        ]
      },
      {
        test: /.md$/,
        exclude: apiRegex,
        use: [
          ...appConfig.loaders.js(),
          {
            loader: path.join(__dirname, './tools/apiLoader'),
            options: {
              template: require.resolve('./templates/md-component'),
            }
          },
        ]
      },
    ]
  },
  plugins: [
    appConfig.plugins.define({
      '__VERSION__': JSON.stringify(pkg.version),
    }),
    appConfig.plugins.html({
      template: './templates/index.html',
    }),
  ],
  resolve: {
    alias: {
      globalize: path.resolve('./node_modules/globalize'),
    }
  },
  devServer: {
    historyApiFallback: {
      index: '/',
    },
  },
})

if (PRODUCTION) {
  config = appConfig.merge(config, {
    devtool: 'source-map',

    output: {
      path: path.join(__dirname, '/../../docs'),
      filename: 'docs.js',
      publicPath: '/docs'
    },

    plugins: [
      appConfig.plugins.banner({
        banner: '(c) 2014 - present: Jason Quense | https://github.com/jquense/react-widgets/blob/master/LICENSE.md',
        entryOnly : true
      }),
    ]
  })
}
else {
  config = appConfig.merge(config, {
    resolve: {
      alias: {
        'react-widgets$': require.resolve('../react-widgets/src/index.js'),
        'react-widgets/lib': path.resolve('../react-widgets/src')
      }
    }

  })
}

module.exports = config;
