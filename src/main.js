import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router/routerConfig'
import store from './store/storeConfig'
import "./assets/styles.scss"
import './assets/tailwind.css'
import fb from './firebaseConfig.js'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
