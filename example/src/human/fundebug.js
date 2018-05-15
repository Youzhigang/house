import Vue from 'vue'
import fundeug from 'fundebug-javascript'
const fundebug = require('fundebug-javascript')
fundebug.apikey =
  '7069de8f71fe0ab7d8c9adaed971b0ff7febbda08a150f1f8fde0bfcd110886f'

fundebug.appversion = process.env.VERSION_HASH

console.log(fundebug)

function formatComponentName (vm) {
  if (vm.$root === vm) return 'root'

  var name = vm._isVue
    ? (vm.$options && vm.$options.name) ||
      (vm.$options && vm.$options._componentTag)
    : vm.name
  return (
    (name ? 'component <' + name + '>' : 'anonymous component') +
    (vm._isVue && vm.$options && vm.$options.__file
      ? ' at ' + (vm.$options && vm.$options.__file)
      : '')
  )
}

Vue.config.errorHandler = function (err, vm, info) {
  var componentName = formatComponentName(vm)
  var propsData = vm.$options && vm.$options.propsData

  fundebug.notifyError(err, {
    metaData: {
      componentName: componentName,
      propsData: propsData,
      info: info
    }
  })
}
