export function Authenticate({ to, next, store }) {
    if (!store.state.authentication.accessToken) {
        return next({
            name: "login"
        })
    };
    return next();
}

export function AuthorizeAdmin({ to, next, store }) {
    if (store.state.user.currentUser.role === "admin") {
        return next();
    }
    return next({
        path: "/notfound",
    })
}

export function AuthorizeVoter({ to, next, store }) {
    // console.log(store.state.user.currentUser.role)
    if (store.state.user.currentUser.role === "voter") {
        return next();
    }
    return next({
        path: "/notfound"
    })
}

export function AuthorizeGuest({ to, next, store }) {
    if (store.state.authentication.accessToken) {
        if (store.state.user.currentUser.role === "admin") {
            return next({
                name: 'dashboard'
            })
        } else if (store.state.user.currentUser.role === "voter") {
            return next({
                name: 'vote'
            })
        }
        return next({
            name: "notfound"
        })
    }
    return next()
}