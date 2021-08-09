const path = require('path');
const resolve = (dir) => path.join(__dirname, '.', dir);
module.exports = {
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = 'VueComponents'
        return args
      })
    config.resolve.alias.set('@', resolve('src'))
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "~@/assets/css/variables.sass"`
      },
      scss: {
        prependData: `@import "~@/assets/css/variables.scss";`
      }
    },

  }
}