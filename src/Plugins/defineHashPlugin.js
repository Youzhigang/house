const webpack = require('webpack')
const execSync = require('child_process').execSync

module.exports = runner => {
  let hash = 'unset-hash'

  // Get git commit hash
  try {
    hash = execSync('git rev-parse --short HEAD')
      .toString()
      .trim()
  } catch (err) {
    console.log("The package isn't a git repository.")
  }

  // Define node process env
  process.env.VERSION_HASH = process.env.VERSION_HASH || hash

  // Define fundebug apiKey
  if (!runner.options.fundebug.apiKey) {
    console.log(JSON.stringify(runner.options))
    throw new Error('fundebug apiKey is undefined')
    return
  }
  // console.log(runner.options.fundebug.apiKey, 1111)
  process.env.FUNDEBUG_API_KEY = runner.options.fundebug.apiKey

  // Define browser process env
  return new webpack.DefinePlugin({
    'process.env.VERSION_HASH': JSON.stringify(process.env.VERSION_HASH),
    'process.env.FUNDEBUG_API_KEY': JSON.stringify(runner.options.fundebug.apiKey)
  })
}
