const execSync = require('child_process').execSync
const path = require('path')
const fs = require('fs')
const chalk = require('chalk')

module.exports = function uploadSourceMapFiles (builtDirectory) {
  let cmd
  try {
    const apikey = process.env.FUNDEBUG_API_KEY
    const version = process.env.VERSION_HASH
    console.log(chalk.blue(`Please confirm the apikey ${apikey} and version ${version}`))
    if (!apikey || !version) {
      console.log(`The uploader stop, check apikey ${apikey} and version ${version}`)
      return
    }
    cmd = `fundebug-cli upload --apikey ${apikey} --appversion ${version} --directory ${builtDirectory}/sourcemap`
    console.log(chalk.cyan(`Run cmd:   ${cmd}`))
    console.log(chalk.green('Begin to upload sourcemap...'))
    execSync(cmd)
    console.log(chalk.green('Upload sourcemap success!'))
  } catch (err) {
    console.log(chalk.red('Upload sourcemap to fundebug fail...'))
  }
}
