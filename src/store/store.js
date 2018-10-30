import Vue from 'vue'
import Vuex from 'vuex'
//import firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    userEmail: null,
  },
  mutations: {
    SET_USER(state, payload) {
      state.user = payload.uid
      state.userEmail = payload.email
    },
    CLEAR_USER(state) {
      state.user = null
      state.userEmail = null
    }
  },
  actions: {
    setUser({commit}, payload) {
      commit('SET_USER', payload)
    },
    clearUser({commit}) {
      commit('CLEAR_USER')
    }
  },
  getters: {
    getUser: state => state.user,
    getUserEmail: state => state.userEmail
  }
})
