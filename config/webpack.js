/**
 * Module dependencies
 */

var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
const { WebPlugin, AutoWebPlugin } = require('web-webpack-plugin');

/**
 * A basic Webpack config to use with a Sails app.
 *
 * This config is used by the api/hooks/webpack hook which initializes a
 * Webpack compiler in "watch" mode.
 *
 * See https://webpack.js.org/configuration for a full guide to Webpack config.
 *
 */

module.exports.webpack = {

  /***************************************************************************
  *                                                                          *
  * Create one item in the `entry` dictionary for each page in your app.     *
  *                                                                          *
  ***************************************************************************/
  entry: {
    'app': './assets/js/app.js',
    'cart': './assets/js/cart.js'
  },


  /***************************************************************************
  *                                                                          *
  * Output bundled .js files with a `.bundle.js` extension into              *
  * the `.tmp/public/js` directory                                           *
  *                                                                          *
  ***************************************************************************/
  output: {
    filename: 'js/[name].bundle.js',
    path: path.resolve(__dirname, '..', '.tmp', 'public')
  },

  /***************************************************************************
  *                                                                          *
  * Set up a couple of rules for processing .css and .less files. These will *
  * be extracted into their own bundles when they're imported in a           *
  * JavaScript file.                                                         *
  *                                                                          *
  ***************************************************************************/
  module: {
    rules: [
      // Extract less files
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({ use: 'css-loader' })
      },
      // Extract less files
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract({ use: 'css-loader!less-loader' })
      },
      { // sass / scss loader for webpack
          test: /\.(sass|scss)$/,
          use: ExtractTextPlugin.extract({
            use: [{
                    loader: "css-loader"
                }, {
                    loader: "sass-loader",
                    options: {
                        includePaths: ['./node_modules/foundation-sites/scss/']
                    }
                }]
          })
      }
    ],
  },

  /***************************************************************************
  *                                                                          *
  * Set up some plugins to help with Sails development using Webpack.        *
  *                                                                          *
  ***************************************************************************/
  plugins: [

    // This plugin cleans out your .tmp/public folder before lifting.
    new CleanWebpackPlugin(['public'], {
      root: path.resolve(__dirname, '..', '.tmp'),
      verbose: true,
      dry: false
    }),

    // This plugin extracts CSS that was imported into .js files, and bundles
    // it into separate .css files.  The filename is based on the name of the
    // .js file that the CSS was imported into.
    new ExtractTextPlugin({
      filename: 'styles/[name].bundle.css',
      disable: false,
      allChunks: true
    }),

    new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        'window.$': 'jquery'
    }),

    // This plugin copies the `images` and `fonts` folders into
    // the .tmp/public folder.  You can add any other static asset
    // folders to this list and they'll be copied as well.
    new CopyWebpackPlugin([
      {
        from: './assets/images',
        to: path.resolve(__dirname, '..', '.tmp', 'public', 'images')
      },
      {
        from: './assets/fonts',
        to: path.resolve(__dirname, '..', '.tmp', 'public', 'fonts')
      }
    ])
  ]

};