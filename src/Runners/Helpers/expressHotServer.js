const path = require('path')
const express = require('express')
const ExpressBuilder = require('../../Builders/ExpressBuilder')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const connectHistoryApiFallback = require('connect-history-api-fallback')
const chalk = require('chalk')
const useExpressProxy = require('./useExpressProxy')

module.exports = runner => {
  runner.expressBuilder = new ExpressBuilder()
  runner.expressBuilder.listeningMessage = chalk.yellow(
    'Hello, I\'am Fresh house. The development server is starting......wait me.'
  )

  runner.expressBuilder.addBeforeListenQueue(app => {
    const compiler = webpack(runner.webpackBuilder.create())

    const devMiddleware = webpackDevMiddleware(compiler, {
      publicPath: runner.options.publicPath,
      quiet: true
    })

    const hotMiddleware = webpackHotMiddleware(compiler, {
      log: () => {}
    })

    // force page reload when html-webpack-plugin template changes
    compiler.plugin('compilation', compilation => {
      compilation.plugin('html-webpack-plugin-after-emit', (data, callback) => {
        hotMiddleware.publish({ action: 'reload' })
        callback()
      })
    })

    useExpressProxy(app, runner.options.proxyTable)

    // handle fallback for HTML5 history API
    app.use(connectHistoryApiFallback())

    // serve webpack bundle output
    app.use(devMiddleware)

    // enable hot-reload and state-preserving
    // compilation error display
    app.use(hotMiddleware)

    // serve pure static assets
    const assetsStaticPath = path.posix.join(
      runner.options.publicPath, runner.options.builtAssetsDirectory)
    app.use(assetsStaticPath, express.static(runner.options.cacheDirectory))

    devMiddleware.waitUntilValid(() => {
      console.log(chalk.yellow(`I are ready. open http://localhost:${runner.options.port} to see me.`))
    })
  })
}
