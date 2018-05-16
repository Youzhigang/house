const execSync = require('child_process').execSync
const path = require('path')
const fs = require('fs')

module.exports = function uploadSourceMapFiles (builtDirectory) {
  let cmd
  try {
    const apikey = process.env.FUNDEBUG_API_KEY
    const version = process.env.VERSION_HASH
    cmd = `fundebug-cli upload --apikey ${apikey} --appversion ${version} --directory ${builtDirectory}/sourcemap`
    console.log(cmd, '--cmd')
    execSync(cmd)
  } catch (err) {
    console.log('upload sourcemap to fundebug fail...')
  }
}
