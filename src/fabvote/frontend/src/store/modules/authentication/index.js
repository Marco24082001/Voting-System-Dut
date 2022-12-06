export default {
    namespaced: true,
    state: {
        accessToken: "",
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
