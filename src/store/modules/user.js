export default {
    
    state: {
        user: null,
        userEmail: null,
        userName: null,
        userPhoto: null
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
        }
    },
    getters: {
        getUser: state => state.user,
        getUserEmail: state => state.userEmail,
        getUserName: state => state.userName,
        getUserPhoto: state => state.userPhoto
    }
    
}