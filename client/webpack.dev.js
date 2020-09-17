const { EnvironmentPlugin } = require('webpack');
const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    host: '0.0.0.0',
    contentBase: path.resolve(__dirname, './'),
    publicPath: '/',
    // writeToDisk: true,
    // hot: true,
  },

  plugins: [
    // new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Dev Notes App',
      template: 'index.html',
      reactSrc: '../node_modules/react/umd/react.development.js',
      reactDomSrc: '../node_modules/react-dom/umd/react-dom.development.js'
    }),
    new EnvironmentPlugin([
      'GROUPS_ROOT_URL',
      'NOTES_ROOT_URL'
    ]),
  ],
});
