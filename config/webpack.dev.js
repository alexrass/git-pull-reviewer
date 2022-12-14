const { merge } = require('webpack-merge');
const config = require('./webpack.config.js');
const path = require('path');
const WatchPlugin = require('webpack-watch-files-plugin').default;

module.exports = merge(config, {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new WatchPlugin({
      files: [
        path.resolve(__dirname, '../public'),
        path.resolve(__dirname, '../src'),
      ],
    }),
  ],
});
