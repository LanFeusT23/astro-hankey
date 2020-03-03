import "./assets/styles.scss"
import './assets/tailwind.css'

import Vue from 'vue'
import VueMeta from 'vue-meta'
import Vue2TouchEvents from 'vue2-touch-events'


import './registerServiceWorker'

import router from './router/routerConfig'
import store from './store/storeConfig'
import { sync } from 'vuex-router-sync'

import App from './App.vue'

const unsync = sync(store, router)
Vue.use(Vue2TouchEvents)
Vue.use(VueMeta, {
  // optional pluginOptions
  refreshOnceOnNavigation: true
})

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
