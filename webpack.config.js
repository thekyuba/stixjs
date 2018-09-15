const path = require('path');

module.exports = {
  entry: './src/stix.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'stix.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist')
  }
};