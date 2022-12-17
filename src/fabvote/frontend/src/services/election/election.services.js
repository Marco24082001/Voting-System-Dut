import BaseService from "../base";

class ElectionService extends BaseService {
    get entity() {
        return "election";
    }

    async getAll() {
        try {
            return await this.request().get(`/${this.entity}`);
        } catch (e) {
            console.log(e);
        }
    }

    async edit(data) {
        try {
            return await this.request().put(`/${this.entity}`, data);
        } catch (e) {
            console.log(e);
        }
    }

    async reset() {
        try{
            return await this.request().get(`/${this.entity}/reset`);
        } catch (error) {
            console.log(error);
        }
    }
}

export default new ElectionService();
