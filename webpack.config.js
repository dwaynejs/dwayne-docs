const path = require('path');

module.exports = {
  entry: './app/index.js',
  output: {
    path: path.resolve('./'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.pug$/, loader: 'pug-loader', exclude: [/node_modules/] },
      { test: /\.md$/, loader: 'raw-loader', exclude: [/node_modules/] }
    ]
  },
  watch: true
};
