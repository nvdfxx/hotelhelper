export default {
    state: {
        infoMessage: {
            text: null,
            color: null
        } 
    },
    mutations: {
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
        getInfoMessage: state => state.infoMessage
    }
}