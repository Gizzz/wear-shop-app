const path = require('path');

module.exports = {
	context: __dirname,
  entry: './frontend/App.jsx',
  devtool: 'source-map',
	output: {
    path: path.join(__dirname, '/public'),
    filename: 'bundle.js'
  },
	module: {
		rules: [
			{ 
				test: /\.(js|jsx)$/, 
				exclude: /node_modules/, 
				loader: "babel-loader" 
			}
		]
	}
};