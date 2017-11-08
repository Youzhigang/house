const express = require('express')
const chalk = require('chalk')
const path = require('path')
const connectHistoryApiFallback = require('connect-history-api-fallback')
const BaseRunner = require('./BaseRunner')
const ExpressBuilder = require('../Builders/ExpressBuilder')
const useExpressProxy = require('./Helpers/useExpressProxy')

class PresetationRunner extends BaseRunner {
  constructor (...args) {
    super(...args)
    this.expressBuilder = new ExpressBuilder()
  }

  initialization () {
    super.initialization()

    this.expressBuilder.addBeforeListenQueue(app => {
      useExpressProxy(app, this.options.proxyTable)
      app.use(connectHistoryApiFallback())
      app.use(path.posix.join(
        this.options.publicPath,
        this.options.assetsPath
      ), express.static(path.join(
        this.options.builtDirectory,
        this.options.assetsPath
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
    super.run()
    this.expressBuilder.listen(this.options.port)
  }
}

module.exports = PresetationRunner
