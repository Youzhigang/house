const { SourceMapUploader } = require('../../src')

new SourceMapUploader()
  .setOptions(require('./options'))
  .setProxy(require('./proxyMaps'))
  .setAppEnvs(require('./appEnvs'))
  .run()
