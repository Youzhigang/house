const DevelopmentRunner = require('../../src/Runners/DevelopmentRunner')

new DevelopmentRunner()
  .setOptions(require('./options'))
  .setProxy(require('./proxyMaps'))
  .setAppEnvs()
  .extend(runner => {
    console.log(runner.webpackBuilder.create())
  })
  .run()
