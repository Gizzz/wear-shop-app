const path = require('path');

module.exports = {
  context: __dirname,
  devtool: 'source-map',
  entry: './src/frontend/index.js',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/, 
        exclude: /node_modules/, 
        loader: 'babel-loader' 
      },
      {
        test: /\.less$/,
        use: [
          { loader: 'style-loader' }, 
          {
            loader: 'css-loader', 
            options: { url: false },
          }, 
          { loader: 'less-loader' },
        ]
      }
    ]
  }
};