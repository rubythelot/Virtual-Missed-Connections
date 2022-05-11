// webpack.config.js

const Dotenv = require('dotenv-webpack');

module.exports = {
  output: {
    filename: 'scripts.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: ['babel-loader']

      },
    ],
  },
  plugins: [
    new Dotenv()
  ]
};
