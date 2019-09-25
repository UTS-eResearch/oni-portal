const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const config = require('./config.json');

module.exports = {
  // the entry can be split so we dont load many things that are not required
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')//'/Users/moises/source/github-uts/ocfl-nginx/assets/'
  },
  // optimization: {
  //   minimizer: [new UglifyJsPlugin()]
  // },
  plugins: [new HtmlWebpackPlugin({
    title:'Data Portal',
    template: 'src/index.html'})],//Keep this file as is. We should manage html in JS
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 9000,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Methods': '*',
    },
    proxy: config.dev.proxy,
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
        test: /\.css$/,
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader'}
        ]
      }
    ]
  }
};