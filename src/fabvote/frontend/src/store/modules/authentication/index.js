export default {
    namespaced: true,
    state: {
        accessToken: "",
        role: "",
    },
    getters: {
        getAccessToken(state) { 
            return state.accessToken;
        },
    },
    mutations: {
        setAccessToken(state, accessToken) {
            state.accessToken = accessToken;
        },
    }
}
