const ServerRunner = require('../../src/Runners/ServerRunner')

new ServerRunner()
  .setOptions(require('./options'))
  .run()
