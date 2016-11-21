const path              = require('path')
const webpack           = require('webpack')
const autoprefixer      = require('autoprefixer')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const extractCSS        = new ExtractTextPlugin('css/[name].css')

module.exports = {
  context: __dirname,

  entry: {
    base: './src/components/base',
  },

  output: {
    path: path.resolve('./dist/'),
    filename: 'bundle.js',
  },

  devtool: "source-map",

  module: {
    loaders: [
      { test: /\.js$|\.jsx$/, exclude: /node_modules/, loader: 'babel-loader', query: { presets: ['react'] } },
      { test: /\.scss$/, loader: extractCSS.extract("style-loader", 'css-loader!postcss-loader!sass-loader') }
    ],
  },

  plugins: [ extractCSS ],

  postcss: [ autoprefixer({ browsers: ['last 2 versions'] }) ],

  resolve: {
    modulesDirectories: ['node_modules',],
    extensions: ['', '.js', '.jsx', 'scss'],
  },

  stats: {
      children: false
  }
}
