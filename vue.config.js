const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  runtimeCompiler: true, //是否使用包含运行时编译器的 Vue 构建版本
  publicPath: '',
  productionSourceMap: false, //不在production环境使用SourceMap
  devServer: {
    //跨域
    port: 8080, // 端口号
    open: true, //配置自动启动浏览器
    proxy: {
      // 配置跨域处理 可以设置多个
      '/api': {
        target: 'http://api.7-orange.cn:7300/mock/5def6a2d448e330a1116366e/api/',
        ws: true,
        changeOrigin: true
      }
    }
  },
  // css相关配置
  css: {
    // 启用 CSS modules
    modules: false,
    // 是否使用css分离插件
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
      css: {},
      postcss: {
        plugins: [
          require('postcss-pxtorem')({
            rootValue: 37.5, // 换算的基数
            selectorBlackList: ['weui', 'mu'], // 忽略转换正则匹配项
            propList: ['*'],
          }),
          // require('postcss-px2rem')({
					// 	remUnit: 75
					// })
        ]
      }
    },
  },
  chainWebpack(config) {
    // svg设置
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    if (process.env.NODE_ENV === 'production') {
      if (process.env.npm_config_report) {
        config
          .plugin('webpack-bundle-analyzer')
          .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
          .end()
      }
    } else {}
  }
}