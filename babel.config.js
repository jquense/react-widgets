module.exports = api => ({
  presets: [
    [
      'babel-preset-jason',
      {
        debug: false,
        runtime: false,
        modules: api.env() === 'esm' ? false : 'commonjs',
        targets: {
          browsers: ['> 1%', 'last 4 versions', 'not ie < 9'],
        },
      },
    ],
    '@babel/preset-flow',
  ],
  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    '@babel/plugin-proposal-optional-chaining',
  ],
})
