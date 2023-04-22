module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/base",
    "plugin:vue/essential",
    "plugin:vue/recommended",
  ],
  parserOptions: {
    parser: "babel-eslint",
  },
  plugins:[
  ],
  rules: {},
};
