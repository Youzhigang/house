const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = runner => {
  // https://github.com/ampedandwired/html-webpack-plugin
  return new HtmlWebpackPlugin({
    filename: 'index.html',
    template: runner.options.publicFile,
    inject: true
  })
}
