import BaseService from "../base";

class BallotService extends BaseService {
    get entity() {
        return "ballots";
    }

    async getAllBallots() {
        try {
            return await this.request().get(`/${this.entity}/get-all-ballots`);
        } catch (error) {
            console.log(error);
        }
    }

    async getBallotsForVoter(id) {
        try {
            return await this.request().get(`/${this.entity}/get-ballots-for-voter`);
        } catch (error) {
            console.log(error);
        }
    }

    async submitBallots(data) {
        try {
            return await this.request().post(`/${this.entity}/submit-ballots`, data);
        } catch (error) {
            console.log(error);
        }
    }

    // async create(data) {
    //     return await this.request().post(`/${this.entity}/create`, data);
    // }

    // async getbyId(id) {
    //     try {
    //         return await this.request().get(`/${this.entity}/get/${id}`);
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }

    // async getAll() {
    //     try {
    //         return await this.request().get(`/${this.entity}/getAll`);
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }

    // async edit(data) {
    //     try {
    //         return await this.request().put(`/${this.entity}/edit`, data);
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }

    // async delete(id) {
    //     try {
    //         return await this.request().delete(`/${this.entity}/delete/${id}`);
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }
}

export default new BallotService();