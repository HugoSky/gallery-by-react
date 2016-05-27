'use strict';
//端口 文件路径  插件
const path = require('path');
const srcPath = path.join(__dirname, '/../src');
const dfltPort = 8000;
function getDefaultModules() {
  return {
    preLoaders: [{
        test: /\.(js|jsx)$/,
        include: srcPath,
        loader: 'eslint-loader'
      }],
    loaders: [
      // {
      //   test: /\.(js|jsx)$/,
      //   include: /node_modules/,
      //   loader: 'react-hot!babel-loader'
      // },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!postcss-loader'
        // loader: 'style-loader!css-loader!postcss-loader!autoprefixer-loader?{browers:["last 2 version"]}'
      },
      {
        test: /\.sass/,
        loader: 'style-loader!css-loader!postcss-loader!sass-loader?outputStyle=expanded&indentedSyntax'
      },
      {
        test: /\.scss/,
        loader: 'style-loader!css-loader!postcss-loader!sass-loader?outputStyle=expanded'
        // loader: 'style-loader!css-loader!autoprefixer-loader?{browers:["last 2 version"]}!sass-loader?outputStyle=expanded'
      },
      {
        test: /\.less/,
        loader: 'style-loader!css-loader!postcss-loader!less-loader'
      },
      {
        test: /\.styl/,
        loader: 'style-loader!css-loader!postcss-loader!stylus-loader'
      },
      {
        test: /\.(png|jpg|gif|woff|woff2)$/,
        loader: 'url-loader?limit=8192'
      },
      {
        test: /\.(mp4|ogg|svg)$/,
        loader: 'file-loader'
      },
      {
        test : /\.json$/,
        loader: 'json-loader'
      }
    ]
  };
}
module.exports = {
  srcPath: srcPath,
  publicPath: '/assets/',
  port: dfltPort,
  getDefaultModules: getDefaultModules,
  postcss: function () {
    return [];
  }
};
