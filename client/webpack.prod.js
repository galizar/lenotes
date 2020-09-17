const { EnvironmentPlugin } = require('webpack');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    // new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Notes App',
      template: 'index.html',
      reactSrc: 'https://unpkg.com/react@16.13.1/umd/react.production.min.js',
      reactDomSrc: 'https://unpkg.com/react-dom@16/umd/react-dom.production.min.js'
    }),
    new EnvironmentPlugin([
      'GROUPS_ROOT_URL',
      'NOTES_ROOT_URL'
    ]),
  ],
});
