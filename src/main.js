import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import './common/scss/index.scss'
import fastclick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false
fastclick.attach(document.body)
Vue.use(VueLazyLoad,{
  loading: require('./common/image/avatar.jpg')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
