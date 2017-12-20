const path = require('path')
const SentryWebpackPlugin = require('@sentry/webpack-plugin')
const readFileSync = require('fs').readFileSync

module.exports = runner => {
  try {
    readFileSync(path.join(process.cwd(), '.sentryclirc'), 'utf8')
  } catch (err) {
    console.log('Need add .sentryclirc file.')
    return new SentryWebpackPlugin()
  }

  return new SentryWebpackPlugin({
    release () {
      return process.env.SENTRY_RELEASE
    },
    include: path.join(
      runner.options.moduleDirectory,
      runner.options.builtPath,
      runner.options.publicPath
    ),
    ignore: [
      path.join(process.cwd(), 'node_modules')
    ]
  })
}
