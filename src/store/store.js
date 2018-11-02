import Vue from 'vue'
import Vuex from 'vuex'
//import firebase from 'firebase'
import userModule from './modules/user'
import commonModule from './modules/common'
import postsModule from './modules/posts'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    userModule,
    commonModule,
    postsModule
  }
})
