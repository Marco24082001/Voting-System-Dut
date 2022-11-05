import BaseService from "../base";

class VoterService extends BaseService {
    get entity() {
        return "voters";
    }

    async getAll() {
        try {
            return await this.request().get(`/${this.entity}`);
        } catch (e) {
            console.log(e);
        }
    }
}

export default new VoterService();
