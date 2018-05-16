const execSync = require('child_process').execSync
const path = require('path')
const fs = require('fs')

module.exports = function moveSourceMapFiles (builtDirectory) {
  // const distPath = context.options.sourceMapDist
  const srcPath = path.join(builtDirectory, 'static/js')
  const destPath = path.join(builtDirectory, 'sourcemap')
  if (!fs.existsSync(destPath)) {
    console.log('创建sourcemap 目录')
    fs.mkdirSync(destPath)
    // console.log(fs.existsSync(destPath))
  }
  // console.log(destPath, 'destPath1')
  const cmd = `mv ${srcPath}/*.map ${destPath}`
  // console.log(cmd, 'mv sourcemap')
  try {
    execSync(cmd)
  } catch (err) {
    console.log('copy sourcemap error')
  }
  // console.log('destPath', destPath)
  return destPath
}
