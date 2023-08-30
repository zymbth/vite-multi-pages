module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  plugins: ['only-warn'],
  extends: ['plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  ignorePatterns: ['.eslintrc.js','.eslintrc.cjs','src/assets/**/*'],
  rules: {
    'linebreak-style': ['warn', 'unix'],
  },
}
