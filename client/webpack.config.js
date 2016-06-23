// todo
// - extract css
// - HOT
// - production env

let webpack = require('webpack');

module.exports = {
  entry: {
    app: './app/app.js',
    vendor: ['vue', 'vue-resource', 'vuex', 'd3']
  },
  output: {
    filename: '../public/assets/js/app.js'
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
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', '../public/assets/js/vendor.js')
  ]
};