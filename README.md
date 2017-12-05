# Documentation

<p>
  <a href="https://circleci.com/gh/freshesx/house/tree/master" title="CircleCI">
    <img src="https://circleci.com/gh/freshesx/house/tree/master.svg?style=svg">
  </a>
</p>

## Usage

``` bash
yarn add -D @freshes/house
```

## Guide

Core files of house have:

* src/Runners/DevelopmentRunner.js, to start development environment.
* src/Runners/ProductionRunner.js, to build production environment.
* src/Runners/ServerRunner.js, after building production, it will start a Express to set proxy and open web page for preview.

## Development

Add new file `./script/development.js` in project root path.

``` javascript
// ./script/development.js
import DevelopmentRunner from '@freshes/house/src/Runners/DevelopmentRunner.js'

new DevelopmentRunner()
  .setOptions(require('./configs/options'))
  // set proxy map by http-proxy-middleware
  .setProxy(require('./configs/proxy'))
  // set app browser env by webpack.DefinePlugin
  .setAppEnvs(require('./configs/appEnvs'))
  // extend webpack or express
  .extend(runner => {})
  // Finally run
  .run()
```

Then edit `./package.json`

``` json
{
  "scripts": {
    "start": "node ./scripts/development.js"
  }
}
```

## About runner.extend

runner has two built-in builder, they are webpackBuilder and expressBuilder.

``` javascript
new DevelopmentRunner()
  .extend(runner => {
    // you can refer to api documentation, the documentation will be uploaded
    runner.webpackBuilder.xxx
    runner.expressBuilder.xxx
  })
```
