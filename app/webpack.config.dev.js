const path = require('path');
const webpack = require('webpack');

const mod = `${__dirname.includes(process.cwd()) ? process.cwd() : __dirname}/node_modules/`;

module.exports = {
  devtool: 'cheap-module-inline-source-map',
  entry: [
    path.join(__dirname, 'src/index.jsx'),
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: 'public',
    port: 2500,
    historyApiFallback: true,
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [`${mod}babel-preset-env`, 'react'],
        },
      },
    }, {
      test: /\.js?$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [`${mod}babel-preset-env`],
        },
      },
    }, {
      test: /\.json?$/,
      loader: 'json-loader',
    }, {
      test: /\.scss$/,
      loader: 'style-loader!css-loader!sass-loader',
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader!sass-loader',
    }, {
      test: /\.(png|jpg|jpeg|svg|ttf|mp4)$/i,
      loader: 'file-loader',
    }],
  },
};

