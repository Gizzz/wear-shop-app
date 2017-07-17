const path = require("path");

module.exports = {
  context: __dirname,
  entry: "./frontend/index.js",
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
      },
      {
        test: /\.less$/,
        use: [
          { loader: "style-loader" 	}, 
          {
            loader: "css-loader", 
            options: { url: false },
          }, 
          { loader: "less-loader" },
        ]
      }
    ]
  }
};