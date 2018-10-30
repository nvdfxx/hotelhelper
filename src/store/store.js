import Vue from 'vue'
import Vuex from 'vuex'
//import firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    userEmail: null,
    userName: null,
    infoMessage: null
  },
  mutations: {
    SET_USER(state, payload) {
      state.user = payload.uid
      state.userEmail = payload.email
      state.userName = payload.displayName
    },
    CLEAR_USER(state) {
      state.user = null
      state.userEmail = null
      state.userName = null
    },
    UPDATE_USER_NAME(state, payload) {
      state.userName = payload
    },
    SET_INFO_MESSAGE(state, payload) {
      state.infoMessage = payload
    }
  },
  actions: {
    setUser({commit}, payload) {
      commit('SET_USER', payload)
    },
    clearUser({commit}) {
      commit('CLEAR_USER')
    },
    updateUserName({commit}, payload) {
      commit('UPDATE_USER_NAME', payload)
    },
    setInfoMessage({commit}, payload) {
      commit('SET_INFO_MESSAGE', payload)
      setTimeout(() => commit('SET_INFO_MESSAGE', null), 2000)
    }
  },
  getters: {
    getUser: state => state.user,
    getUserEmail: state => state.userEmail,
    getUserName: state => state.userName,
    getInfoMessage: state => state.infoMessage
  }
})
