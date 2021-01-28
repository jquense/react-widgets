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
  plugins: [
    api.env() !== 'esm' && '@babel/plugin-transform-modules-commonjs',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-syntax-dynamic-import',
  ].filter(Boolean),
})
