import BaseService from "../base";
// import { storeTokenToVuex } from "@/helper/accessToken";
// import { store}
import { storeTokenToVuex, storeCurrentUserToVuex } from "@/helper/storeHelper";
class AuthenticationService extends BaseService {
    get entity() {
        return "authentication";
    }

    async login(data) {
        const res = await this.request().post(`/${this.entity}/login`, data);
        console.log(res);
        if (!res.data.error) {
            storeTokenToVuex(res.data);
            const currentUser = (await this.getCurrentUser()).data.response;
            storeCurrentUserToVuex(currentUser);
        }
        return res;
    }

    async logout() {
        try {
            localStorage.removeItem("vuex");
            localStorage.clear();
            return true;
        } catch (error) {
            return false;
        }
    }

    async getCurrentUser() {
        try {
            return await this.request().get(`/${this.entity}/getCurrentUser`);
        } catch (error) {
            console.log(error);
        }
    }
}

export default new AuthenticationService();
