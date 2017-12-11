const ServerRunner = require('../../src/Runners/ServerRunner')

new ServerRunner()
  .setOptions(require('./configs/options'))
  .setProxy(require('./configs/proxy'))
  .setAppEnvs(require('./configs/appEnvs'))
  .run()
