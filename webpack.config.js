var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ProvidePlugin = require('webpack/lib/ProvidePlugin');

module.exports = {
  devtool: 'source-map',
  entry: {},
  module: {
    loaders: [
      { test: /\.js$/, exclude: [/app\/lib/, /node_modules/], loader: 'babel-loader' },
      { test: /\.html$/, loader: 'raw-loader' },
      { test: /\.(scss|sass)$/, loader: 'style-loader!css-loader!sass-loader?includePaths[]=' + path.resolve(__dirname, "./node_modules/compass-mixins/lib")},
    //  { test: /\.styl$/, loader: 'style!css!stylus' },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.(png|woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=100000' }
      //,
      // Bootstrap 4
      //{ test: /bootstrap\/dist\/js\/umd\//, loader: 'imports?jQuery=jquery' }

    ]
  },
  plugins: [

    new ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
      jquery: 'jquery',
      Popper: 'popper.js/dist/umd/popper.js'
      // "Tether": 'tether',
      // "window.Tether": "tether"
    }),
    // Injects bundles in your index.html instead of wiring all manually.
    // It also adds hash to all injected assets so we don't have problems
    // with cache purging during deployment.
    new HtmlWebpackPlugin({
      template: 'client/index.html',
      inject: 'body',
      hash: true
    }),

    // Automatically move all modules defined outside of application directory to vendor bundle.
    // If you are using more complicated project structure, consider to specify common chunks manually.
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        return module.resource && module.resource.indexOf(path.resolve(__dirname, 'client')) === -1;
      }
    })
  ]
};
