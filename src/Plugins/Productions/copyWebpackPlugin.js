const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = runner => {
  // copy custom static assets
  return new CopyWebpackPlugin([
    {
      from: runner.options.cacheDirectory,
      to: runner.options.builtAssetsDirectory,
      ignore: ['.*']
    }
  ])
}
