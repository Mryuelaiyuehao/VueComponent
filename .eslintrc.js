module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/essential",
    "plugin:vue/recommended",
    "plugin:prettier/recommended",
  ],
  globals: {
    window: "readonly",
    document: "readonly",
  },
  parserOptions: {
    parser: "babel-eslint",
  },
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error",
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
  },
  ignorePatterns: ["node_modules/", "src/assets/font/index.js"],
};
