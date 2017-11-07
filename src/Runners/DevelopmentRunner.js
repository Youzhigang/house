const BaseRunner = require('./BaseRunner')

class DevelopmentRunner extends BaseRunner {
  /**
   * Extend development webpack config
   *
   * @public setDevelopmentWebpack
   * @return {this}
   */
  setDevelopmentWebpack () {
    // Extend webpack.entry.app, add webpack-hot-middleware file
    this.webpackBuilder.extend(webpack => {
      Object.keys(webpack.entry).forEach(name => {
        const file = this.path.join(__dirname, '../Utils/devClient.js')
        webpack.entry[name] = [file].concat(webpack.entry[name])
      })
      return webpack
    })

    this.webpackBuilder.merge({
      devtool: '#cheap-module-eval-source-map'
    })

    this.webpackBuilder.addPlugins([
      this.use(require('../Plugins/Developments/hotModulePlugin')),
      this.use(require('../Plugins/Developments/noEmitOnErrorsPlugin')),
      this.use(require('../Plugins/Developments/htmlWebpackPlugin')),
      this.use(require('../Plugins/Developments/FriendlyErrorsPlugin'))
    ])

    return this
  }

  setExpress () {
    this.use(require('./Helpers/expressHotServer'))
  }

  /**
   * Run runner
   *
   * @public run
   * @return {Object}
   */
  run () {
    super.run()
    this.setDevelopmentWebpack()
    this.setExpress()
    this.expressBuilder.listen(this.options.port)
  }
}

module.exports = DevelopmentRunner
