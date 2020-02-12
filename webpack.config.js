const StyleLintPlugin = require('stylelint-webpack-plugin');
const packageJSON = require('./package.json');
const path = require('path');

const DIST = path.resolve("./dist");
const MODE = process.env.NODE_ENV || 'development';
const SOURCE_MAP = 'sourec-map';
const DEVTOOL = (process.env.NODE_ENV === 'development') ? SOURCE_MAP : false;

console.log('Webpack mode:', MODE); // eslint-disable-line no-console

const config = {
  devtool: DEVTOOL,
  entry: [
    './src/qlik-heatmap-chart.js'
  ],
  mode: MODE,
  output: {
    filename: `${packageJSON.name}.js`,
    path: DIST
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /(node_modules|d3.min.js)/,
        loader: "eslint-loader",
        options: {
          failOnError: true
        }
      },
      {
        test: /.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      }
    ]
  },
  plugins: [
    new StyleLintPlugin()
  ]
};

module.exports = config;
