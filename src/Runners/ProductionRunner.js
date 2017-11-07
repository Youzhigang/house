const BaseRunner = require('./BaseRunner')
const productionOptions = require('./Options/productionOptions')

class ProductionRunner extends BaseRunner {
  /**
   * @constructor
   */
  constructor (options, ...args) {
    options = Object.assign({}, productionOptions, options)
    super(options, ...args)
    this.setProductionWebpack()
  }

  /**
   * Extend production webpack config
   *
   * @public setProductionWebpack
   * @return {this}
   */
  setProductionWebpack () {
    this.webpackBuilder.merge({
      devtool: false
    })

    this.webpackBuilder.merge({
      output: {
        path: this.options.builtDirectory,
        filename: this.parseAssetsFilename('js/[name].[chunkhash].js'),
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

  parseAssetsFilename (relativePath) {
    return this.path.posix.join(this.options.assetsPath, relativePath)
  }

  run () {
    return require('../Utils/buildProd').call(this, {
      webpack: this.webpackBuilder.create(),
      builtDirectory: this.options.builtDirectory,
      assetsPath: this.options.assetsPath
    })
  }
}

module.exports = ProductionRunner
