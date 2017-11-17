# 使用文档

<p>
  <a href="https://circleci.com/gh/HumanUI/house/tree/master" title="CircleCI">
    <img src="https://circleci.com/gh/HumanUI/house/tree/master.svg?style=svg">
  </a>
</p>

## 安装

``` bash
yarn add -D @freshes/house
```

## 使用指南

house 的核心类是以下几个文件：

* src/Runners/DevelopmentRunner.js，主要用于启动开发环境；
* src/Runners/ProductionRunner.js，主要用于打包生成环境；
* src/Runners/ServerRunner.js，主要用于为打包后的生成环境提供服务器支持，启动 express、接口代理等服务。

## 开发环境

在项目目录下新建 ./script/development.js

``` javascript
// ./script/development.js
import DevelopmentRunner from '@freshes/house/src/Runners/DevelopmentRunner.js'

new DevelopmentRunner()
  .setOptions(require('./options'))    // 设定参数
  .setProxy(require('./proxyMaps'))    // 设定接口代理
  .setAppEnvs()                        // 设定环境变量
  .extend(runner => {})                // 扩展 webpack、express 等配置和服务
  .run()                               // 运行
```

修改你的项目的 ./package.json 文件

``` json
{
  "scripts": {
    "start": "node ./scripts/development.js"
  }
}
```

开发环境、生产环境和服务器环境的更多用法可以参考 @freshes/starter 项目，即将发布。

## runner.extend 的方法介绍

runner 有目前有两个内置的 builder 可以被暴露出来，分别是 webpackBuilder 和 expressBuilder。

``` javascript
new DevelopmentRunner()
  .extend(runner => {
    // 具体方法参考 API 手册，待上传
    runner.webpackBuilder.xxx
    runner.expressBuilder.xxx
  })
```
