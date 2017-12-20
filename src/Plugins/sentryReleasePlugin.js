const path = require('path')
const webpack = require('webpack')
const execSync = require('child_process').execSync
const readFileSync = require('fs').readFileSync

module.exports = runner => {
  let commit = undefined
  let version = undefined
  const release = []

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

  if (version) release.push(version)
  if (commit) release.push(commit)

  // Define node process env
  process.env.SENTRY_RELEASE = release.join('-')

  // Define browser process env
  return new webpack.DefinePlugin({
    'process.env.SENTRY_RELEASE': JSON.stringify(process.env.SENTRY_RELEASE)
  })
}
