import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import user from "./modules/user";
import authentication from "./modules/authentication";
import animation from "./modules/animation";

export default createStore({
    plugins: [createPersistedState()],
    modules: {
        user: user,
        authentication: authentication,
        animation: animation,
    }
})

