import BaseService from "../base";

class PositionService extends BaseService {
    get entity() {
        return "positions";
    }

    async create(data) {
        return await this.request().post(`/${this.entity}`, data);
    }

    async getbyId(id) {
        try {
            return await this.request().get(`/${this.entity}/${id}`);
        } catch (e) {
            console.log(e);
        }
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

    async delete(id) {
        try {
            return await this.request().delete(`/${this.entity}/${id}`);
        } catch (e) {
            console.log(e);
        }
    }
}

export default new PositionService();