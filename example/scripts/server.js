const { ServerRunner } = require('../../src')

new ServerRunner()
  .setOptions(require('./options'))
  .setProxy(require('./proxyMaps'))
  .setAppEnvs(require('./appEnvs'))
  .run()
