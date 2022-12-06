export default {
    namespaced: true,
    state: {
        fullscreenLoading: false
    },
    getters: {
        getFullscreenLoading(state) {
            return state.fullscreenLoading;
        }
    },
    mutations: {
        setFullscreenLoading(state, status) {
            state.fullscreenLoading = status;
        }
    }
}
