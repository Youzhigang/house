# Documentation

<p>
  <a href="https://circleci.com/gh/freshesx/house/tree/master" title="CircleCI">
    <img src="https://circleci.com/gh/freshesx/house/tree/master.svg?style=svg">
  </a>
</p>

## Usage

```bash
yarn add -D @freshes/house
```

## Guide

Core files of house have:

* src/Runners/DevelopmentRunner.js, to start development environment.
* src/Runners/ProductionRunner.js, to build production environment.
* src/Runners/ServerRunner.js, after building production, it will start a Express to set proxy and open web page for preview.

## Development

Add new file `./script/development.js` in project root path.

```javascript
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

```json
{
  "scripts": {
    "start": "node ./scripts/development.js"
  }
}
```

## About runner.extend

runner has two built-in builder, they are webpackBuilder and expressBuilder.

```javascript
new DevelopmentRunner().extend(runner => {
  // you can refer to api documentation, the documentation will be uploaded
  runner.webpackBuilder.xxx
  runner.expressBuilder.xxx
})
```

## Sentry Hash

```
新增 VERSION_HASH 的环境的变量，默认取当前 git commit 的 hash 值。
```

## webpack externals

新增webpack externals

```javascript
externals: {
  vue: 'Vue',
  vuex: 'Vuex',
  'vue-router': 'VueRouter'
}
```

webpack 不会打包 external中的类库, 减少js bundle 体积
当你使用
`
import Vue from 'vue'
`
时, webpack会引入`window.vue`, 所以必须在template 即`index.html`中引入相关cdn
example

```html
<head>
  <script src=//static.34580.cn/cn/public/vue/2.5.3/vue.min.js></script>
  <script src=//static.34580.cn/cn/public/vue-router/3.0.0/vue-router.min.js></script>
  <script src=//static.34580.cn/cn/public/vuex/3.0.0/vuex.min.js></script>
</head>
```

使用externals 方法:
 1. 升级house `yarn add @freshes/house@next`

 2. 扩展`runner`的`extend`方法

```javascript
const ProductionRunner = require('@freshes/house/src/Runners/ProductionRunner')

new ProductionRunner()
  .setOptions(require('./configs/options'))
  .setProxy(require('./configs/proxy'))
  .setAppEnvs({
    ...require('./configs/appEnvs'),
    NODE_ENV: 'production'
  })
  .extend(runner => {
    const config = runner.webpackBuilder.create() // webpack config
    const externals = {
      ...config.externals,
      vue: 'Vue',
      vuex: 'Vuex',
      'vue-router': 'VueRouter'
    }
    config.externals = externals
  }).run()

```