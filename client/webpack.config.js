const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
    app: './app/app.js',
    vendor: ['vue', 'vue-resource', 'vuex', 'd3']
  },
  output: {
    path: path.resolve('../public/assets/js'),
    filename: 'app.js'
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|svg)$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: 'assets/img/[name].[ext]',
          emitFile: false
        }
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', "css!postcss!sass")
      }
    ]
  },
  postcss: function () {
    return [autoprefixer];
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
    new ExtractTextPlugin('../css/app.css')
  ]
};

if(process.env.NODE_ENV === 'production') {
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin()
  ])
}