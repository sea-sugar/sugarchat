const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: '0.0.0.0',
    port: 80,
    open: true,
    devtool:'nosources-source-map', //报错时，显示源码所在行列，不展示源码
    proxy: {
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      [process.env.VUE_APP_BASE_API]: {
        target: process.env.VUE_APP_URL_PATH,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      },
      // ['/api/v4']: {
      //   target: `http://localhost:8081`,
      //   changeOrigin: true,
      //   logLevel: 'debug',
      // },
      // ['/health-api']:{
      //   target:"http://localhost:8081",
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/health-api': '',
      //   }
      // }
    },
  },
})
