module.exports = (api) => ({
  presets: [
    [
      'env-modules',
      {
        modules: api.env() !== 'esm' ? 'commonjs' : false,
        include: [
          'proposal-nullish-coalescing-operator',
          'proposal-optional-chaining',
        ],
      },
    ],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
  plugins: ['macros'],
})
