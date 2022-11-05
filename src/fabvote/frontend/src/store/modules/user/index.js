export default {
    namespaced: true,
    state: {
        currentUser: {
            id: "",
            name: "",
            email: "",
            role: "",
        }
    },
    getters: {
        getCurrentUser(state) {
            return state.currentUser;
        }
    },
    mutations: {
        setCurrentUser(state, currentUser) {
            state.currentUser = currentUser;
        }
    }
}
