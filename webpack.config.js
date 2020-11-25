const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = {

  // the entry can be split so we dont load many things that are not required

  entry: './src/index.js',

  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')//'/Users/moises/source/github-uts/ocfl-nginx/assets/'
  },

  externals: {
    'subcrate': 'https://etc.mikelynch.org/js/oni-subcrate-bundle.js'
  },

  // optimization: {
  //   minimizer: [new UglifyJsPlugin()]
  // },

  plugins: [
    new webpack.ProvidePlugin({ // inject ES5 modules as global vars
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Tether: 'tether'
    }),
    new HtmlWebpackPlugin({
      title: 'Data Portal',
      template: 'src/index.html'
    })
  ],//Keep this file as is. We should manage html in JS


  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 9000,
    clientLogLevel: 'debug',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Methods': '*',
    },
    proxy: {
      "/config/portal": {
        "target": "http://localhost:8080/",
        "secure": false
      },
      "/solr": {
        "target": "http://localhost:8080/",
        "secure": false
      },
      "/ocfl": {
        "target": "http://localhost:8080/",
        "secure": false
      }
    },
    historyApiFallback: {
      index: 'index.html'
    }
  },

  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   exclude: /(node_modules)/,
      //   use: {
      //     loader: 'babel-loader',//Webpack loader to perform transformation on files. if using ES2017 needs to be transformed into ES2015 This is why we use Babel
      //     options: {
      //       presets: ['@babel/preset-env'] //most browser supported with this preset, you can add more presets here.
      //     }
      //   }
      // },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader'},
          {loader: 'sass-loader'},
          {
            // Loader for webpack to process CSS with PostCSS
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [
                  require('autoprefixer')
                ];
              }
            }
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg|ico)$/i,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'images/'
          }
        }]
      }
    ]
  }
};
