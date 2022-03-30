// const path = require('path')

module.exports = {
  // outputDir: './build',
  // publicPath: './',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://192.168.124.6:18097/',
        pathRewrite: {
          '^/api': ''
        },
        ws: true,
        changeOrigin: true
      }
    },
    port: 1025
  },
  configureWebpack: {
    resolve: {
      alias: {
        views: '@/views'
      }
    }
  }
  // configureWebpack: (config) => {
  //   config.resolve.alias = {
  //     '@': path.resolve(__dirname, 'src'),
  //     views: '@/views'
  //   }
  // },
  // chainWebpack: (config) => {
  //   config.resolve.alias.set('@', path.resolve(__dirname, 'src')).set('views', '@/views')
  // }
}
