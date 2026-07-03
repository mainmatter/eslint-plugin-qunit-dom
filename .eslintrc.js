'use strict';

module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: '2019',
  },
  plugins: ['eslint-plugin', 'filenames', 'import', 'node', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:eslint-comments/recommended',
    'plugin:eslint-plugin/all',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:node/recommended',
    'prettier',
  ],
  env: {
    node: true,
  },
  rules: {
    'prettier/prettier': 'error',
  },
  overrides: [
    {
      // Test files:
      files: ['**/*.test.js'],
      parserOptions: {
        ecmaVersion: '2019',
        sourceType: 'module',
      },
      rules: {
        'node/no-unsupported-features/es-syntax': 'off',
        'import/named': 'off',
      },
    },
  ],
};
