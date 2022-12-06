export function Authenticate({ to, next, router, store }) {
    if (!store.state.authentication.accessToken) {
        return router.push({ name: "login" });
    };
    return next();
}

export function AuthorizeAdmin({ to, next, router, store }) {
    console.log(store.state.user.currentUser)
    if (store.state.user.currentUser.docType === "admin") {
        return next();
    }else if(store.state.user.currentUser.docType === "voter") {
        return next({ name: "vote" });
    }
    return next({path: "/notfound"});
}

export function AuthorizeVoter({ to, next, router, store }) {
    if (store.state.user.currentUser.docType === "voter") {
        return next();
    } else if(store.state.user.currentUser.docType === "voter") {
        return next({ name: "dashboard" });
    }
    return next({path: "/notfound"});
}

export function AuthorizeGuest({ to, next, router, store }) {
    if (store.state.authentication.accessToken) {
        if (store.state.user.currentUser.docType === "admin") {
            return next({
                name: "dashboard"
            })
        } else if (store.state.user.currentUser.docType === "voter") {
            return next({
                name: "vote"
            })
        }
        return next({
            path: "/notfound"
        })
    }
    return next()
}