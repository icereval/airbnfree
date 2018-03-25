const path = require('path');
const webpack = require('webpack');

const mod = `${__dirname.includes(process.cwd()) ? process.cwd() : __dirname}/node_modules/`;

module.exports = {
  devtool: 'cheap-module-inline-source-map',
  entry: [
    path.join(__dirname, 'src/index.jsx'),
  ],
  output: {
    publicPath: '/dist/',
    path: path.join(__dirname, 'public/dist/'),
    filename: 'bundle.js',
  },
  devServer: {
    port: 2500,
    historyApiFallback: true,
    contentBase: [path.join(__dirname, 'public')],
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env.API_URL': JSON.stringify('http://localhost:5000'),
    }),
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

