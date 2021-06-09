const path = require('path');

module.exports = {
    // webpack entry
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          // make sure order is style-loader>>css-loader
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
};