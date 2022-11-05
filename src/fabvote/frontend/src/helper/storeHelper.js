export function storeTokenToVuex(accessToken) {
    const store = require("@/store");
    store.default.commit("authentication/setAccessToken", accessToken);
}

export function storeCurrentUserToVuex(currentUser) {
    const store = require("@/store");
    store.default.commit("user/setCurrentUser", currentUser);
}
