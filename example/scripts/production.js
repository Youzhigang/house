const { ProductionRunner } = require('../../src')

new ProductionRunner()
  .setOptions(require('./options'))
  .setProxy(require('./proxyMaps'))
  .setAppEnvs(require('./appEnvs'))
  .run()
