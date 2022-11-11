module.exports = {
  extends: ['jason/react', 'eslint-config-4catalyzer-typescript', 'prettier'],
  globals: {
    css: false,
  },
  parserOptions: {
    babelOptions: {
      rootMode: 'upward',
    },
  },
  rules: {
    'global-require': 'off',
    quotes: 'off',
    'no-unused-expressions': 'off',
    'prefer-const': 'off',
    'no-duplicate-imports': 'off',
    'import/no-duplicates': 'off',
    '@typescript-eslint/member-delimiter-style': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/consistent-type-assertions': 'off',
  },
}
