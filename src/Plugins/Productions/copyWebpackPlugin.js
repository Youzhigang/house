const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')

module.exports = runner => {
  // copy custom static assets
  return new CopyWebpackPlugin([
    {
      from: path.join(
        runner.options.moduleDirectory,
        runner.options.assetsPath
      ),
      to: path.join(
        runner.options.moduleDirectory,
        runner.options.builtPath,
        runner.options.publicPath,
        runner.options.assetsPath
      ),
      ignore: ['.*']
    }
  ])
}
