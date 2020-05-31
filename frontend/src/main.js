import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import vuetify from './plugins/vuetify'
var numeral = require('numeral')

Vue.config.productionTip = false

export const eventBus = new Vue()

// Define global filters
Vue.filter('temperatureDisplayFilter', function (value) {
  if (!value) return ''
  return numeral(value).format('0')
})

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
