module.exports = {
  extends: [
    "stylelint-config-standard",
    "stylelint-prettier/recommended",
    // "stylelint-config-standard-scss",
    "stylelint-config-recess-order",
  ],
  plugins:[
    "stylelint-order",
    "stylelint-prettier",
  ],
  rules:{
    "prettier/prettier": true
  }
};
