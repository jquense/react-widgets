module.exports = {
  presets: [
    [
      'babel-preset-jason',
      {
        debug: false,
        runtime: false,
        targets: {
          browsers: ['> 1%', 'last 4 versions', 'not ie < 9'],
        },
      },
    ],
    '@babel/preset-flow',
  ],
  plugins: ['@babel/plugin-proposal-decorators'],
}
