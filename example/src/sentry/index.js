import Vue from 'vue'
import Raven from 'raven-js'
import RavenVue from 'raven-js/plugins/vue'

// It has sentry key, then install Raven
if (process.env.SENTRY_KEY) {
  Raven
    .config(process.env.SENTRY_KEY, {
      release: process.env.VERSION_HASH
    })
    .addPlugin(RavenVue, Vue)
    .install()
}

export function captureException (...args) {
  // @todo set user context by every capturing
  // Raven.setUserContext()
  Raven.captureException(...args)
}
