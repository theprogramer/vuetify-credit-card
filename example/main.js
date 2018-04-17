import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

/* eslint-disable */
// console.log(Vue.version)
new Vue({
  el: '#app-wrap',
  render: h => h(App),
  components: { App }
})
