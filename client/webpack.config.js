// todo
// - extract css
// - production env

var webpack = require('webpack');
var path = require('path');
var env = require('node-env-file');

env(path.resolve('../backend/.env'));
var client_url = process.env.CLIENT_URL;
var assets_path = process.env.ASSETS_PATH;

module.exports = {
  entry: {
    app: [
      'webpack/hot/dev-server',
      'webpack-dev-server/client?http://localhost:8080',
      './app/app.js'
    ],
    vendor: ['vue', 'vue-resource', 'vuex', 'd3']
  },
  output: {
    path: path.resolve('../public/assets/js'),
    publicPath: 'http://localhost:8080/' + assets_path,
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
        loader: 'style!css!sass'
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    hot: true,
    inline: true,
    proxy: {
      "*": client_url
    }
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
    new webpack.HotModuleReplacementPlugin()
  ]
};