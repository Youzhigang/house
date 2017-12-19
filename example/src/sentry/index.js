import Vue from 'vue'
import Raven from 'raven-js'
import RavenVue from 'raven-js/plugins/vue'

// It has sentry key, then install Raven
if (process.env.SENTRY_KEY) {
  Raven
    .config(process.env.SENTRY_KEY, {
      release: process.env.GIT_COMMIT
    })
    .addPlugin(RavenVue, Vue)
    .install()
}

export default Raven
