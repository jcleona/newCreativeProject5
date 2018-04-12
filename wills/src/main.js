import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store';
import jQuery from 'jquery'
import 'bootstrap/dist/css/bootstrap.css'
global.jQuery = jQuery
global.$ = jQuery
let Bootstrap = require('bootstrap')

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
