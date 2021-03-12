module.exports = {
  publicPath: process.env.NODE_ENV === 'development' ? '' : '/web/',
  outputDir: 'web',
  devServer: {
    proxy: 'http://laravel.test'
  }
}
