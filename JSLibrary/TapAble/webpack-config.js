import webpack = require("webpack");

module.export = {
  entry: {
    index: __dirname + "src/index.js"
  },

  output: {
    path: __dirname + 'dist',
    filename: '[name].js',
    chunkFilename: '[name].js'
  },

  mode: 'development',

  devtool: false,

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],

  devServer: {
    contentBase: '.dist',
    hot: true,
    inline: true
  }
}