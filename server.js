/*eslint no-console:0 */
'use strict';
require('core-js/fn/object/assign');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');
const open = require('open');


//新建webpack服务器  这样就不用每次修改完成后webpack打包文件
//cfg/dev.js中的webpack/hot/only-dev-server 可保证运行效果热更新
//运行的效果即打包后的效果
new WebpackDevServer(webpack(config), config.devServer)
.listen(config.port, 'localhost', (err) => {
  if (err) {
    console.log(err);
  }
  console.log('Listening at localhost:' + config.port);
  console.log('Opening your system browser...');

  open('http://localhost:' + config.port + '/webpack-dev-server/');
});

//node server.js --env=dev
//运行时 指定env为dev开发环境
//const config = require('./webpack.config');
//webpack.config中buildConfig方法根据env得到dev.js 然后引用dev.js，然后将引用结果返回
//所以这里的config是dev.js对外提供的config
