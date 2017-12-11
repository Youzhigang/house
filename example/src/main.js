import 'babel-polyfill'
import Vue from 'vue'
import './sentry'
import store from './store'
import './human'
import App from './app.vue'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
