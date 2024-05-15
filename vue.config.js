const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 部署生产环境和开发环境下的URL。
  // 默认情况下，Vue CLI 会假设你的应用是被部署在一个域名的根路径上
  // 例如 https://www.ruoyi.vip/。如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。例如，如果你的应用被部署在 https://www.ruoyi.vip/admin/，则设置 baseUrl 为 /admin/。
  publicPath: process.env.NODE_ENV === "production" ? "/chat/" : "/chat/",
  // 在npm run build 或 yarn build 时 ，生成文件的目录名称（要和baseUrl的生产环境路径一致）（默认dist）
  outputDir: 'dist',
  // 用于放置生成的静态资源 (js、css、img、fonts) 的；（项目打包之后，静态资源会放在这个文件夹下）
  assetsDir: 'static',
  devServer: {
    host: '0.0.0.0',
    port: 80,
    open: true,
    // devtool:'nosources-source-map', //报错时，显示源码所在行列，不展示源码 未解决
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
