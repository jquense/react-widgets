module.exports = api => ({
  presets: [
    '@babel/preset-modules',
    '@babel/preset-react',
    '@babel/preset-typescript'
  ],
  plugins: [
    api.env() !== 'esm' && '@babel/plugin-transform-modules-commonjs',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-syntax-dynamic-import'
  ].filter(Boolean)
});
