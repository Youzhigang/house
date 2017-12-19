const path = require('path')
const SentryWebpackPlugin = require('@sentry/webpack-plugin')

module.exports = runner => {
  return new SentryWebpackPlugin({
    release () {
      return process.env.GIT_COMMIT
    },
    include: path.join(process.cwd(), 'example/dist'),
    ignore: [
      path.join(process.cwd(), 'node_modules')
    ]
  })
}
