const path = require('path')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: 'development',

  entry: {
    index: path.join(__dirname, '../src/index.tsx'),
    search: path.join(__dirname, '../src/search.ts'),
  },

  output: {
    filename: '[name]_[chunkhash:8].js',
    path: path.join(__dirname, '../dist'),
  },

  module: {
    rules: [
      {
        test: /\.tsx|\.ts$/,
        use: ['ts-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../dist'
            },
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
          'sass-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => {
                require('autoprefixer')({
                  overrideBrowserslist: ['>1%', 'ios7'],
                })
              },
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../template/index.html'),
      filename: 'index.html',
      chunks: ['index'],
    }),
    // new CleanWebpackPlugin(),
  ],

  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
}
