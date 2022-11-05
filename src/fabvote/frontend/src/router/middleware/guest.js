

export default function guest ({ to, next, store }){
    // console.log(store.getters['authentication/getAccessToken']);
    // store.default.getters["authentication/getAccessToken"]
    if(store.state.authentication.accessToken){
        return next({
           name: 'dashboard'
        })
    }
   
    return next()
}