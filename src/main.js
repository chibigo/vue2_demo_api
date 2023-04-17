import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuetify from 'vuetify'
import router from './router'

import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/dist/vuetify.min.css'

Vue.use(VueAxios, axios)
const vuetify = new Vuetify({
  icons: {
    iconfont: 'mdi' // use Material Design Icons
  }
})
Vue.config.productionTip = false
Vue.use(Vuetify)
new Vue({
  vuetify,
  router,
  render: h => h(App),
}).$mount('#app')

