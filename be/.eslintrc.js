module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: ['google', 'prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['prettier'],
  rules: {
    'require-jsdoc': 0,
    'valid-jsdoc': 0,
    'prettier/prettier': 'error',
    'new-cap': 0
  },
  settings: {}
};
