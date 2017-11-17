module.exports = runner => {
  return {
    test: /\.js$/,
    loader: 'babel-loader',
    include: [
      runner.path.join(process.cwd(), 'node_modules/vue-human'),
      runner.path.join(process.cwd(), 'node_modules/vue-human-icons'),
      runner.path.join(process.cwd(), 'node_modules/vue-human-env'),
      runner.path.join(process.cwd(), 'node_modules/strawes')
    ],
    exclude: [
      runner.path.join(process.cwd(), 'node_modules/vue-human/node_modules'),
      runner.path.join(process.cwd(), 'node_modules/vue-human-icons/node_modules'),
      runner.path.join(process.cwd(), 'node_modules/vue-human-env/node_modules'),
      runner.path.join(process.cwd(), 'node_modules/strawes/node_modules')
    ]
  }
}
