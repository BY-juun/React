const path = require('path');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
  name: 'rsp-dev',
  mode: 'development',
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  entry: {
    app: './client',
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      options: {
        presets: [
          ['@babel/preset-env', {
            targets: {browsers: ['last 2 chrome versions']},
            debug: true,
          }],
          '@babel/preset-react',
        ],
        plugins: ["react-refresh/babel"]
      },
      exclude: path.join(__dirname, 'node_modules'),
    }],
  },
  plugins: [
    new ReactRefreshWebpackPlugin(),
  ],
  output: {
    filename: '[name].js',
  },
  devServer: {
    publicPath: '/dist',
    hot: true,
    port : 8888,
  }
};