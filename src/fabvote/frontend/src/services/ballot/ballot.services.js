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
}

export default new BallotService();
