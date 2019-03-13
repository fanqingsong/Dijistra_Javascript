const path = require('path');

module.exports = {
  entry: './src/dijistra.js',
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: 'dijistra.umd.js',
    // library: "myDemo",
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, "src")
        ],
        loader: 'babel-loader'
      }
    ]
  },
  resolve: {
    extensions: ['', 'js'],
  }
};
