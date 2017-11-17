const express = require('express')
const chalk = require('chalk')
const path = require('path')
const connectHistoryApiFallback = require('connect-history-api-fallback')
const BaseRunner = require('./BaseRunner')
const ExpressBuilder = require('../Builders/ExpressBuilder')
const useExpressProxy = require('./Helpers/useExpressProxy')

/**
 * @class
 * Server Runner
 */
class ServerRunner extends BaseRunner {
  /**
   * Add express to expressBuilder
   * @param  {*} args
   * @return {this}
   */
  constructor (...args) {
    super(...args)
    this.expressBuilder = new ExpressBuilder()
  }

  /**
   * Add initialization
   * @protected
   * @return {this}
   */
  initialization () {
    super.initialization()

    this.expressBuilder.addBeforeListenQueue(app => {
      useExpressProxy(app, this.proxyMaps)
      app.use(connectHistoryApiFallback())
      app.use(path.posix.join(
        this.options.publicPath
      ), express.static(path.join(
        this.options.moduleDirectory,
        this.options.builtPath
      )))
    })

    this.expressBuilder.listeningMessage = chalk.yellow(
      `Hello, you can open http://localhost:${this.options.port}`
    )

    return this
  }

  /**
   * Run runner
   * @return {void}
   */
  run () {
    super.run()
    this.expressBuilder.listen(this.options.port)
  }
}

module.exports = ServerRunner
