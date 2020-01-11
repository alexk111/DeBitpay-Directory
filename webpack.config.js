const path = require('path');

module.exports = {
  entry: {
    index: './src/scripts/index.js',
    common: './src/scripts/common.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist/scripts')
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
}
