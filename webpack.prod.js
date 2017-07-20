const path = require('path');
const webpack = require('webpack');

module.exports = {
  context: __dirname,
  entry: './src/frontend/index.js',
  devtool: 'source-map',
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
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
  ],
};