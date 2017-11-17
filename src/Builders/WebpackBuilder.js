const deepMerge = require('webpack-merge')

class WebpackBuilder {
  /**
   * @constructor
   */
  constructor () {
    this.webpack = {
      entry: {},
      output: {},
      resolve: {
        extensions: []
      },
      module: {
        rules: []
      },
      plugins: []
    }
  }

  /**
   * Create webpack config object
   * @return {Object} webpack config
   */
  create () {
    return this.webpack
  }

  /**
   * Merge fields to webpack
   * @param  {Object} fields
   * @return {this}
   */
  merge (fields) {
    this.webpack = Object.assign({}, this.webpack, fields)
    return this
  }

  /**
   * Deep merge fields to webpack
   * @param  {Object} fields
   * @return {this}
   */
  deepMerge (fields) {
    this.webpack = deepMerge(this.webpack, fields)
    return this
  }

  /**
   * Flexible extend webpack config,
   * @example
   *   builder.extend(webpack => {
   *     webpack.entry = {} // some new value
   *     return webpack     // need return webpack
   *   })
   * @param  {Function} callback
   * @return {this}
   */
  extend (callback) {
    const extendedWebpack = callback.call(this, this.webpack)

    if (typeof extendedWebpack === 'undefined') {
      throw new Error('You need return a webpack config.')
    } else if (typeof extendedWebpack !== 'object') {
      throw new Error('You need return a object webpack config')
    }

    return this
  }

  /**
   * Push extension to config.resolve.extensions
   * @param {*} extension
   */
  addExtension (extension) {
    this.webpack.resolve.extensions.push(extension)
    return this
  }

  /**
   * Concat extensions to config.resolve.extensions
   * @param {Array} extensions
   */
  addExtensions (extensions) {
    this.webpack.resolve.extensions = this
      .webpack.resolve.extensions.concat(extensions)
    return this
  }

  /**
   * Push rule to webpack.module.rules
   * @param  {*} rule
   * @return {this}
   */
  addRule (rule) {
    this.webpack.module.rules.push(rule)
    return this
  }

  /**
   * Concat rules to webpack.module.rules
   * @param  {Array} rules
   * @return {this}
   */
  addRules (rules) {
    this.webpack.module.rules = this
      .webpack.module.rules.concat(rules)
    return this
  }

  /**
   * Push plugin to webpack.module.plugins
   * @param  {*} plugin
   * @return {this}
   */
  addPlugin (plugin) {
    this.webpack.plugins.push(plugin)
    return this
  }

  /**
   * Concat plugins to webpack.module.plugins
   * @param  {Array} plugins
   * @return {this}
   */
  addPlugins (plugins) {
    this.webpack.plugins = this
      .webpack.plugins.concat(plugins)
    return this
  }
}

module.exports = WebpackBuilder
