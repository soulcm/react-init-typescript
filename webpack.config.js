var webpack = require('webpack');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var entryName = 'bundle';


var plugins = [
  new ExtractTextPlugin({
    filename: 'style.css'
  })
];

var devtool = 'source-map';

var isProd = process.env.NODE_ENV === 'production';

if (isProd) {
  plugins.push(new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  }));

  plugins.push(new UglifyJSPlugin({
    sourceMap: true,
    uglifyOptions: {
      output: {
        ascii_only: true,
        comments: false
      },
      warnings: false
    }
  }));
}

module.exports = {
  entry: {
    [entryName]: ['./src/index.tsx']
  },

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
    publicPath: '/'
  },

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },

  module: {
    rules: [{
      test: /\.tsx?$/,
      use: [
        'babel-loader',
        {
          loader: 'ts-loader',
          options: {
            transpileOnly: true
          }
        }
      ],
      exclude: /node_modules/
    }, {
      test: /\.(css|scss|sass)$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          {
            loader:'css-loader',
            options: {
              minimize: isProd ? true : false
            }
          },
          {
            loader: 'sass-loader',
            options: {
              minimize: isProd ? true : false
            }
          }]
      })
    }]
  },

  plugins,

  devtool,

  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    noInfo: true,
    host: '127.0.0.1',
    port: 8003
  }
}
