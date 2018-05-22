const { DevelopmentRunner } = require('../../src')

new DevelopmentRunner()
  .setOptions(require('./configs/options'))
  .setProxy(require('./configs/proxy'))
  .setAppEnvs(require('./configs/appEnvs'))
  .extend(runner => {
    // You can extend webpack, express and more builders.
    // console.log(runner.webpackBuilder.create())
  })
  .run()
