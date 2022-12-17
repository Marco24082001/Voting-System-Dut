import BaseService from "../base";

class CommonService extends BaseService {
    get entity() {
        return "common";
    }

    async getHistory(id) {
        try {
            return await this.request().get(`/${this.entity}/history/${id}`);
        } catch (error) {
            console.log(error);
        }
    }
}

export default new CommonService();
