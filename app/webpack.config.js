let path = require('path');

module.exports = {
  entry: {
    App: "./assets/scripts/App.js",
    Vendor: "./assets/scripts/Vendor.js"
  },
  output: {
    path: path.resolve(__dirname, "./temp/scripts"),
    filename: "[name].js"
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
