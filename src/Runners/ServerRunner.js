const express = require('express')
const chalk = require('chalk')
const path = require('path')
const connectHistoryApiFallback = require('connect-history-api-fallback')
const BaseRunner = require('./BaseRunner')
const ExpressBuilder = require('../Builders/ExpressBuilder')
const useExpressProxy = require('./Helpers/useExpressProxy')

class PresetationRunner extends BaseRunner {
  /**
   * [setExpress description]
   */
  setExpress () {
    this.expressBuilder = new ExpressBuilder()

    this.expressBuilder.addBeforeListenQueue(app => {
      useExpressProxy(app, this.options.proxyTable)
      app.use(connectHistoryApiFallback())
      app.use(path.posix.join(
        this.options.publicPath,
        this.options.builtAssetsDirectory
      ), express.static(path.join(
        this.options.builtDirectory,
        this.options.builtAssetsDirectory
      )))
      app.get('*', express.static(this.options.builtDirectory))
    })

    this.expressBuilder.listeningMessage = chalk.yellow(
      `Hello, you can open http://localhost:${this.options.port}`
    )

    return this
  }

  /**
   * Run runner
   *
   * @public run
   * @return {Object}
   */
  run () {
    this.setExpress()
    this.expressBuilder.listen(this.options.port)
  }
}

module.exports = PresetationRunner
