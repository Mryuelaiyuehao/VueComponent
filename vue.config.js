const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  configureWebpack: config => {
    config.plugins.forEach((val) => {
      if (val instanceof HtmlWebpackPlugin) {
        val.options.title = 'srcollTab'
      }
    })
  }
}