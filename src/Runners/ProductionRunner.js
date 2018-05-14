const BaseRunner = require('./BaseRunner')
const productionOptions = require('./Options/productionOptions')
const productionAppEnvs = require('./Options/productionAppEnvs')

class ProductionRunner extends BaseRunner {
  /**
   * Add prodcut options
   * @param  {*} args
   * @return {this}
   */
  constructor(...args) {
    super(...args)
    this.options = Object.assign({}, this.options, productionOptions)
    this.appEnvs = Object.assign({}, this.appEnvs, productionAppEnvs)
  }

  /**
   * Extend production webpack config
   * @protected
   * @return {this}
   */
  initialization() {
    super.initialization()

    this.webpackBuilder.merge({
      devtool: 'source-map'
    })

    this.webpackBuilder.deepMerge({
      output: {
        path: this.path.join(
          this.options.moduleDirectory,
          this.options.builtPath,
          this.options.publicPath
        ),
        filename: this.parseAssetsFilename('js/[name].[chunkhash].js'),
        sourceMapFilename: this.parseAssetsFilename('js/[name].js.map'),
        chunkFilename: this.parseAssetsFilename('js/[id].[chunkhash].js')
      }
    })

    this.webpackBuilder.addPlugins([
      this.use(require('../Plugins/Productions/webpackUglifyJsPlugin')),
      this.use(require('../Plugins/Productions/extractTextPlugin')),
      this.use(require('../Plugins/Productions/optimizeCSSPlugin')),
      this.use(require('../Plugins/Productions/htmlWebpackPlugin')),
      this.use(require('../Plugins/Productions/vendorChunkPlugin')),
      this.use(require('../Plugins/Productions/manifestChunkPlugin')),
      this.use(require('../Plugins/Productions/copyWebpackPlugin'))
    ])

    if (this.options.productionGzip) {
      this.webpackBuilder.addPlugin(
        this.use(require('../Plugins/Productions/compressionWebpackPlugin'))
      )
    }

    if (this.options.bundleAnalyzerReport) {
      this.webpackBuilder.addPlugin(
        this.use(require('../Plugins/Productions/bundleAnalyzerPlugin'))
      )
    }

    return this
  }

  parseAssetsFilename(relativePath) {
    return this.path.posix.join(this.options.assetsPath, relativePath)
  }

  /**
   * Run runner
   * @return {*}
   */
  run() {
    super.run()
    return require('../Utils/buildProd').call(this, {
      webpack: this.webpackBuilder.create(),
      builtDirectory: this.path.join(
        this.options.moduleDirectory,
        this.options.builtPath
      )
    })
  }
}

module.exports = ProductionRunner
