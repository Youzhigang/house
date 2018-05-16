const BaseRunner = require('./BaseRunner')
const moveSourceMapFiles = require('../Utils/moveSourceMapFiles')
const uploadSourceMapFiles = require('../Utils/uploadSourceMapFiles')

module.exports = class SourceMapUploader extends BaseRunner {
  constructor (...args) {
    super(...args)
  }

  run () {
    super.run()
    const builtDirectory = this.path.join(
      this.options.moduleDirectory,
      this.options.builtPath
    )
    moveSourceMapFiles(builtDirectory)
    uploadSourceMapFiles(builtDirectory)
  }
}
