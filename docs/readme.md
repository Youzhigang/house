# 使用文档

## 使用指南

house 的核心类是以下几个文件：

* src/Runners/DevelopmentRunner.js
* src/Runners/ProductionRunner.js
* src/Runners/ServerRunner.js

* DevelopmentRunner 主要用于启动开发环境；
* ProductionRunner 主要用于打包生成环境；
* ServerRunner 主要用于为打包后的生成环境提供服务器支持，启动 express、接口代理等服务。

## 开发环境

``` javascript
import DevelopmentRunner from '@freshes/house/src/Runners/DevelopmentRunner.js'

new DevelopmentRunner()
  .setOptions(require('./options'))    // 设定参数
  .setProxy(require('./proxyMaps'))    // 设定接口代理
  .setAppEnvs()                        // 设定环境变量
  .extend(runner => {})                // 扩展 webpack、express 等配置和服务
  .run()                               // 运行
```

## runner.extend 的方法介绍

runner 有目前有两个内置的 builder 可以被暴露出来，分别是 webpackBuilder 和 expressBuilder。

``` javascript
new DevelopmentRunner()
  .extend(runner => {
    // 具体方法参考 API 手册
    runner.webpackBuilder.xxx
    runner.expressBuilder.xxx
  })
```
