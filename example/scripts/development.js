const { DevelopmentRunner } = require('../../src')

new DevelopmentRunner()
  .setOptions(require('./options'))
  .setProxy(require('./proxyMaps'))
  .setAppEnvs({
    NODE_ENV: 'development',
    ...require('./appEnvs')
  })
  .extend(runner => {
    // You can extend webpack, express and more builders.
    // console.log(runner.webpackBuilder.create())
  })
  .run()
