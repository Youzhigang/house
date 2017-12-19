const webpack = require('webpack')
const execSync = require('child_process').execSync

module.exports = runner => {
  let gitCommitHash = undefined

  // Get git commit hash
  try {
    gitCommitHash = execSync('git rev-parse --short HEAD').toString().trim()
  } catch (err) {
    console.log('The package isn\'t a git repository.')
  }

  // Set Node and browser process.env for git commit hash
  process.env.GIT_COMMIT = gitCommitHash

  return new webpack.DefinePlugin({
    'process.env.GIT_COMMIT': JSON.stringify(gitCommitHash)
  })
}
