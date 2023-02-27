const path = require("path")
const webpack = require("webpack");

module.exports = {
	mode: "development",
	watch: true,
	entry: "./src/index.js",
	output: {
		filename: "main.js",
		path: path.resolve(__dirname, "dist"),
	},
	plugins: [		
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",		
			"window.jQuery": "jquery",
		}),
	],
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: ["style-loader", "css-loader"],
			},
		],
	},
}
