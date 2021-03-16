module.exports = {
  publicPath: process.env.NODE_ENV === 'development' ? '' : '/web/',
  outputDir: 'web',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://laravel.test',
        pathRewrite: {
          '^/api': '/',
        },
        changeOrigin: true,
        logLevel: "debug",
      }
    }
  }
}
