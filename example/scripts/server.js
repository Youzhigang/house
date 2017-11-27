const ServerRunner = require('../../src/Runners/ServerRunner')

new ServerRunner()
  .setOptions(require('./options'))
  .setProxy(require('./proxyMaps'))
  .setAppEnvs(require('./appEnvs'))
  .run()
