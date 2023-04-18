/** @type {import('postcss-load-config').Config} */
module.exports = {
	plugins: {
		"postcss-pxtorem": {
			rootValue: 75,
			minPixelValue: 2,
			propList: ["*"],
			exclude: /node_modules/i,
		},
	},
};

