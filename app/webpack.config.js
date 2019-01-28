let path = require('path');

module.exports = {
  entry: "./assets/scripts/App.js",
  output: {
    path: path.resolve(__dirname, "./temp/scripts"),
    filename: "App.js"
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        },
        test: /\.js$/,
        exclude: /node_modules/
      }
    ]
  }
}
