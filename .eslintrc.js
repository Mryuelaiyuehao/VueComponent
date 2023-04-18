module.exports = {
	root: true,
	env: {
		node: true,
		browser: true,
	},
	extends: [
		"plugin:vue/essential",
		"plugin:vue/recommended",
		"eslint:recommended",
	],
	parserOptions: {
		parser: "babel-eslint",
	},
	rules: {},
};

