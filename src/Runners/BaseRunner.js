const path = require('path')
const WebpackBuilder = require('../Builders/WebpackBuilder')
const baseOptions = require('./Options/baseOptions')

class BaseRunner {
  /**
   * @constructor
   *
   * @param {Object} options some options
   */
  constructor (options) {
    this.path = path
    this.options = baseOptions
    this.appEnvs = {}
    this.webpackBuilder = new WebpackBuilder()
  }

  setOptions (options) {
    this.options = Object.assign({}, this.options, options)
    return this
  }

  setAppEnvs (appEnvs) {
    this.appEnvs = Object.assign({}, this.appEnvs, appEnvs)
    return this
  }

  setProxy (proxyMaps) {
    return this
  }

  extend (callback) {
    if (!this.initialized) this.initialization()
    callback.call(this, this)
    return this
  }

  /**
   * Set base webpack builder and config
   *
   * @public setBaseWebpack
   */
  setBaseWebpack () {
    this.webpackBuilder.merge({entry: {
      app: this.path.join(this.options.appDirectory, 'main.js')
    }})

    this.webpackBuilder.merge({output: {
      path: this.path.join(this.options.builtDirectory),
      filename: '[name].js',
      publicPath: this.options.publicPath
    }})

    this.webpackBuilder.addExtensions(['.js', '.vue', '.json'])

    this.webpackBuilder.addRules([
      this.use(require('../Rules/eslintRule')),
      this.use(require('../Rules/vueRule')),
      this.use(require('../Rules/babelRule')),
      this.use(require('../Rules/imageRule')),
      this.use(require('../Rules/fontRule')),
      ...this.use(require('../Rules/styleRules'))
    ])

    if (this.options.enableHumanRule) {
      this.webpackBuilder.addRule(this.use(require('../Rules/humanRule')))
    }

    this.webpackBuilder.addPlugin(this.use(require('../Plugins/definePlugin')))

    return this
  }

  /**
   * Call some function, and send this to them for using context and methods
   *
   * @public use
   *
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */
  use (callback) {
    return callback.call(this, this)
  }

  /**
   * Important method for extended class
   *
   * @public run
   *
   * @return {Object} webpack config
   */
  run () {
    return this.setBaseWebpack()
  }
}

module.exports = BaseRunner
