const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: __dirname,
  devtool: 'source-map',
  devServer: {
    contentBase: false,
    port: 9000,
    proxy: {
      '/api': 'http://localhost:3000',
    },
    historyApiFallback: true,
  },
  entry: './src/frontend/js/index.js',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.[hash].js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/, 
        exclude: /node_modules/, 
        loader: 'babel-loader',
        options: {
          'presets': [
            ['react'],
          ],
          'plugins': [
            'transform-class-properties',
            'transform-object-rest-spread',
          ]
        },
      },
      {
        test: /\.less$/,
        use: [
          { loader: 'style-loader' }, 
          { loader: 'css-loader' }, 
          { loader: 'less-loader' },
        ]
      },
      {
        test: /\.woff$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(jpg|png|svg|gif)$/,
        use: [
          'file-loader'
        ]
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new CopyWebpackPlugin([
      { from: './src/frontend/img/content', to: 'img/content' },
      { from: './src/frontend/favicon.ico' },
      { from: './src/frontend/service-worker.js' },
    ]),
    new HtmlWebpackPlugin({
      template: './src/frontend/index.html',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
};
