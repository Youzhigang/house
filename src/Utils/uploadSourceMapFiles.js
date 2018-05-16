const execSync = require('child_process').execSync
const path = require('path')
const fs = require('fs')
const chalk = require('chalk')

module.exports = function uploadSourceMapFiles (builtDirectory) {
  let cmd
  try {
    const apikey = process.env.FUNDEBUG_API_KEY
    const version = process.env.VERSION_HASH
    cmd = `fundebug-cli upload --apikey ${apikey} --appversion ${version} --directory ${builtDirectory}/sourcemap`
    console.log(cmd, '--cmd')
    console.log(chalk.green('begin to upload sourcemap...'))
    execSync(cmd)
    console.log(chalk.green('upload sourcemap success!'))
  } catch (err) {
    console.log(chalk.red('upload sourcemap to fundebug fail...'))
  }
}
