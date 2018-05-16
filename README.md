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

## Commit Hash

```
新增 VERSION_HASH 的环境的变量，默认取当前 git commit 的 hash 值。
```

## webpack externals

新增webpack externals

```javascript
externals: {
  vue: 'vue',
  vuex: 'vuex',
  'vue-router': 'vue-router'
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

## fundebug 功能

- 新增了`fundebug`, 用于错误收集和上传,
确保
```
"fundebug-cli": "^0.2.1",
"fundebug-javascript": "^0.4.0",
```
两个依赖正确被安装.

- 新增`process.env.FUNDEBUG_API_KEY`的环境变量, 务必在`options` 中正确配置apikey

```
fundebug: {
  apiKey: '7069de8f71fe0ab7d8c9adaed971b0ff7febbda08a150f1f8fde0bfcd110886f'
}
```
apikey 将被写入环境变量中, 否则fundebug将不能正常使用, 引入fundeub, 可参考example, 和[fundebug文档](https://docs.fundebug.com/notifier/javascript/), example 已有基本使用方法


- 新增sourcemap上传功能

上传sourcemap 之前, 请先打包, 执行`yarn build`. 参考example, 使用方式同build/start, `root/scripts` 新增`uploader.js`
```
const { SourceMapUploader } = require('@freshes/house/src/Runners/SourceMapUploader')

new SourceMapUploader()
  .setOptions(require('./options'))
  .setProxy(require('./proxyMaps'))
  .setAppEnvs(require('./appEnvs'))
  .run()

```
`package.json` script字段新增命令
```
"upload": "node ./scripts/uploader.js",
```

`yarn upload` 即可.

脚本拷贝 `dist/static/js` 中分散`.map`文件至`dist/sourcemap`文件夹中, 请勿上传sourcemap至公网服务器