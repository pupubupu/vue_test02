const webpack = require("webpack");
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  //关闭语法检查
  lintOnSave:false,
  devServer:{
    port:8081 //设置端口号
  },
  pages: {
    index: {
      entry: 'src/main.js'
    }
  },
  configureWebpack:{
    plugins: [
      //配置Jquery插件的参数
      new webpack.ProvidePlugin({
        // 引入jquery
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
      })
    ]
  }
})
