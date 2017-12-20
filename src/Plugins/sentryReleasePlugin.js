const path = require('path')
const webpack = require('webpack')
const execSync = require('child_process').execSync
const readFileSync = require('fs').readFileSync

module.exports = runner => {
  let commit = undefined
  let version = undefined
  let release = 'NONE'

  // Get git commit hash
  try {
    commit = execSync('git rev-parse --short HEAD').toString().trim()
  } catch (err) {
    console.log('The package isn\'t a git repository.')
  }

  // Get package.json version
  try {
    const pkg = JSON.parse(readFileSync(path.join(process.cwd(), 'package.json'), 'utf8'))
    version = pkg.version
  } catch (err) {
    console.log('The package hasn\'t package.json version.')
  }

  if (version && commit) {
    release = `${version}(${commit})`
  } else if (!version && commit) {
    release = `${commit}`
  } else if (version && !commit) {
    release = `${version}`
  }

  console.log('release', release)

  // Define node process env
  process.env.SENTRY_RELEASE = release

  // Define browser process env
  return new webpack.DefinePlugin({
    'process.env.SENTRY_RELEASE': JSON.stringify(process.env.SENTRY_RELEASE)
  })
}
