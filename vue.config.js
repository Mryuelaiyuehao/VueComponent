const path = require("path");
module.exports = {
  publicPath: "/",
  lintOnSave: true,
  pages: {
    index: {
      entry: path.resolve(__dirname, "./preview/index.js"),
      template: path.resolve(__dirname, "./public/index.html"),
      title: "泽跃的组件",
    },
  },
  chainWebpack: (config) => {
    config.resolve.alias.set("@", path.resolve(__dirname, "./src"));
  },
  css: {
    extract: true,
    loaderOptions: {
      scss: {
        prependData: `@import "~@/assets/css/variables.scss";`,
      },
    },
  },
  devServer: {
    hot: true,
    open: true,
    port: 8080,
  },
};
