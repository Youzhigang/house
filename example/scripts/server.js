const { ServerRunner } = require('../../src')

new ServerRunner()
  .setOptions(require('./configs/options'))
  .setProxy(require('./configs/proxy'))
  .setAppEnvs(require('./configs/appEnvs'))
  .run()
