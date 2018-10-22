import Vue from 'vue'
import Vuelidate from 'vuelidate'
import VueFire from 'vuefire'
import Uimini from 'uimini/dist/css/uimini.css' 

import router from './router'
import store from './store'
import App from './App.vue'

Vue.use(Vuelidate, VueFire, Uimini)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
