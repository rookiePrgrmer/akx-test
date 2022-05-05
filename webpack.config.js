const path = require('path');

module.exports = {
  entry: './bin/core.js',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'core.js'
  },
  mode: 'development',
  target: 'node', // 编译产物的目标执行环境，默认是 web，表示在浏览器运行，可以指定为 node，表示在 node 环境运行
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              [
                '@babel/plugin-transform-runtime',
                {
                  corejs: 3,
                  regenerator: true,
                  useESModules: true,
                  helpers: true
                }
              ]
            ]
          }
        }
      }
    ]
  }
};