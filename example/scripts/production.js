const ProductionRunner = require('../../src/Runners/ProductionRunner')

new ProductionRunner()
  .setOptions(require('./options'))
  .run()
