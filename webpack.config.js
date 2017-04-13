const path = require("path");

module.exports = {
	context: __dirname,
	entry: "./frontend/App.js",
	devtool: "source-map",
	output: {
		path: path.join(__dirname, "/public"),
		filename: "bundle.js"
	},
	module: {
		rules: [
			{ 
				test: /\.js$/, 
				exclude: /node_modules/, 
				loader: "babel-loader" 
			}
		]
	}
};