import Vue from 'vue'
import App from './app.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import Vuelidate from 'vuelidate'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import './logo/custom.scss'
import router from './router'
import store from './store'


Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(FontAwesomeIcon)
Vue.use(Vuelidate)


Vue.config.productionTip = false
Vue.component('font-awesome-icon', FontAwesomeIcon)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')