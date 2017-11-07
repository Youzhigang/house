const path = require('path')

module.exports = {
  /**
   * @type {String}
   */
  appDirectory: path.join(process.cwd(), 'src'),

  /**
   * test path
   * @type {String}
   */
  testDirectory: path.join(process.cwd(), 'test'),

  /**
   * static path
   * @type {String}
   */
  cacheDirectory: path.join(process.cwd(), 'static'),

  /**
   * sass resources
   * @type {String|Array}
   */
  sassResources: undefined,

  /**
   * html index.html file path
   * @type {String}
   */
  templateIndex: path.join(process.cwd(), 'index.html'),

  /**
   * build dist path
   * @type {String}
   */
  assetsRoot: path.join(process.cwd(), 'dist'),

  /**
   * dist/static
   * @type {String}
   */
  assetsSubDirectory: 'static',

  /**
   * url root path
   * @type {String}
   */
  assetsPublicPath: '/',

  /**
   * proxy map table
   * @see https://github.com/chimurai/http-proxy-middleware
   * @type {Object}
   */
  proxyTable: {},

  /**
   * http port
   * @type {Number}
   */
  port: process.env.PORT || 8080,

  /**
   * enable css sourceMap
   * @type {Boolean}
   */
  cssSourceMap: true,

  /**
   * enable minize css
   * @type {Boolean}
   */
  cssMinimize: false,

  /**
   * sperate css in single .css file
   * @type {Boolean}
   */
  cssExtract: false,

  /**
   * enable production gzip
   * @type {Boolean}
   */
  productionGzip: false,

  /**
   * production gzip extensions
   * @type {Array}
   */
  productionGzipExtensions: ['js', 'css'],

  /**
   * analyzer report
   * @type {Boolean}
   */
  bundleAnalyzerReport: process.env.npm_config_report,

  /**
   * enable human rule
   */
  enableHumanRule: true,

  /**
   * environment in process.env
   * @type {Object}
   */
  env: {}
}
