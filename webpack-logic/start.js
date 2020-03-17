const webpack = require("webpack");
const config = require("./webpack.config");

webpack(config, (err, stats) => {
    if (err || stats.hasErrors()) {
      // 在这里处理错误
    }
    // 处理完成
  })