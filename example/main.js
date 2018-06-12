require('vuetify/src/stylus/app.styl')
import Vue from 'vue'
import App from './App'

import Vuetify from 'vuetify/es5/components/Vuetify'
import VGrid from 'vuetify/es5/components/VGrid'
import VApp from 'vuetify/es5/components/VApp'
import VTextField from 'vuetify/es5/components/VTextField'

Vue.config.productionTip = false
Vue.use(Vuetify, {
  components: {
    VApp,
    VGrid,
    VTextField
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
