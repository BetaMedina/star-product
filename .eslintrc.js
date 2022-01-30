module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
    jest: true
  },
  extends: [
    'standard'
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 12
  },
  rules: {
    'no-trailing-spaces': 'off',
    'no-new': 'off',
    'no-unused-expressions': 'off',
    camelcase: 'off'
  }
}
