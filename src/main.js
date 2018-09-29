import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import './common/scss/index.scss'
import fastclick from 'fastclick'

Vue.config.productionTip = false
fastclick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
