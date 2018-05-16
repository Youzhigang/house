const execSync = require('child_process').execSync
const path = require('path')
const fs = require('fs')
const chalk = require('chalk')

module.exports = function moveSourceMapFiles (builtDirectory) {
  const srcPath = path.join(builtDirectory, 'static/js')
  const destPath = path.join(builtDirectory, 'sourcemap')
  if (!fs.existsSync(destPath)) {
    console.log('创建sourcemap 目录')
    fs.mkdirSync(destPath)
    
  }
  const cmd = `mv ${srcPath}/*.map ${destPath}`

  try {
    console.log(chalk.green('Begin to copy sourcemap'))
    console.log(chalk.cyan(`Run cmd:  ${cmd}`))
    execSync(cmd)
  } catch (err) {
    console.log('Copy sourcemap error')
  }
  
  console.log(chalk.green('Copy sourcemap complete!'))
  return destPath
}
