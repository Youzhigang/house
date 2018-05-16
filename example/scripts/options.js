const path = require('path')

module.exports = {
  moduleDirectory: path.join(process.cwd(), 'example'),
  sassResources: path.join(process.cwd(), 'example/src/human/config.scss'),
  // @todo Add multi example test to test publicPath
  publicPath: './',
  fundebug: {
    apiKey: '7069de8f71fe0ab7d8c9adaed971b0ff7febbda08a150f1f8fde0bfcd110886f'
  }
}
