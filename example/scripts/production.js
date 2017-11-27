const ProductionRunner = require('../../src/Runners/ProductionRunner')

new ProductionRunner()
  .setOptions(require('./options'))
  .setProxy(require('./proxyMaps'))
  .setAppEnvs(require('./appEnvs'))
  .run()
