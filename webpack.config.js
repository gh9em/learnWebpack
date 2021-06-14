const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const yaml = require('yamljs');

module.exports = {
    // webpack entry
    entry: {
      index: './src/index.js',
    },
    output: {
        filename: '[name].[contenthash].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        // clean dist before compile
        clean: true,
    },
    plugins: [
      // output index.html
      new HtmlWebpackPlugin({
        title: 'Hello Webpack',
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/i,
          // make sure order is style-loader>>css-loader
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.yaml$/i,
          type: 'json',
          parser: {
            parse: yaml.parse,
          },
        },
      ],
    },
};