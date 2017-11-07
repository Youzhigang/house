module.exports = runner => {
  return {
    test: /\.js$/,
    loader: 'babel-loader',
    include: [
      runner.path.join(runner.options.appDirectory),
      runner.path.join(runner.options.testDirectory)
    ]
  }
}
