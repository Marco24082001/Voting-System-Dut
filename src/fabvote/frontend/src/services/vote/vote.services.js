import BaseService from "../base";

class VoteService extends BaseService {
    get entity() {
        return "votes";
    }

    async getAll() {
        try {
            return await this.request().get(`/${this.entity}`);
        } catch (e) {
            console.log(e);
        }
    }
}

export default new VoteService();
