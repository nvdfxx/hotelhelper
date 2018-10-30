import Vue from 'vue'
import Vuelidate from 'vuelidate'
import firebase from 'firebase'
import Uimini from 'uimini/dist/css/uimini.css' 

import router from './router'
import store from './store/store'
import App from './App.vue'

Vue.use(Vuelidate, Uimini)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  mounted() {
    var config = {
      apiKey: "AIzaSyAg9Ti63dbIs9eNFUXIZNbqoGQEq-yjIrE",
      authDomain: "hotelhelper-d8b27.firebaseapp.com",
      databaseURL: "https://hotelhelper-d8b27.firebaseio.com",
      projectId: "hotelhelper-d8b27",
      storageBucket: "hotelhelper-d8b27.appspot.com",
      messagingSenderId: "36450160781"
    };
    firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log('User is signed in')
        console.log(user)
        store.dispatch('setUser', user)
        // ...
      } else {
        console.log('User is signed out')
        store.dispatch('clearUser')
      }
    });
  }
}).$mount('#app')

