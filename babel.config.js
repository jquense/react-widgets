module.exports = (api) => ({
  presets: [
    [
      'env-modules',
      {
        modules: api.env() !== 'esm' ? 'commonjs' : false,
      },
    ],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
})
