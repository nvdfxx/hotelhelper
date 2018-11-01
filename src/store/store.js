import Vue from 'vue'
import Vuex from 'vuex'
//import firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    userEmail: null,
    userName: null,
    userPhoto: null,
    infoMessage: {
      text: null,
      color: null
    } 
  },
  mutations: {
    SET_USER(state, payload) {
      state.user = payload.uid
      state.userEmail = payload.email
      state.userName = payload.displayName
      state.userPhoto = payload.photoURL
    },
    CLEAR_USER(state) {
      state.user = null
      state.userEmail = null
      state.userName = null
      state.userPhoto = null
    },
    UPDATE_USER(state, payload) {
      state.userName = payload.name
      state.userPhoto = payload.photoURL
    },
    SET_INFO_MESSAGE(state, payload) {
      state.infoMessage.text = payload.text
      state.infoMessage.color = payload.color
    },
    CLEAR_INFO_MESSAGE(state) {
      state.infoMessage.text = null
      state.infoMessage.color = null
    }
  },
  actions: {
    setUser({commit}, payload) {
      commit('SET_USER', payload)
    },
    clearUser({commit}) {
      commit('CLEAR_USER')
    },
    updateUser({commit}, payload) {
      commit('UPDATE_USER', payload)
    },
    setInfoMessage({commit}, payload) {

      let color = payload.color;
      let colorToClass = () => {
        switch(color) {
          case 'primary': return 'ui-message--primary' 
          case 'danger': return 'ui-message--danger'
          case 'success': return 'ui-message--success'
          case 'warning': return 'ui-message--warning'
          default: return 'ui-message--primary'
        }
      }

      let text = payload.text

      commit('SET_INFO_MESSAGE', {text: text, color: colorToClass()})
      setTimeout(() => commit('CLEAR_INFO_MESSAGE'), 3000)
    }
  },
  getters: {
    getUser: state => state.user,
    getUserEmail: state => state.userEmail,
    getUserName: state => state.userName,
    getUserPhoto: state => state.userPhoto,
    getInfoMessage: state => state.infoMessage
  }
})
