import Vue from 'vue'
import Vuex from 'vuex'
//import firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    SET_USER(state, payload) {
      state.user = payload
    }
  },
  actions: {
    setUser({commit}, payload) {
      commit('SET_USER', payload)
    }
  },
  getters: {
    getUser: state => state.user
  }
})
