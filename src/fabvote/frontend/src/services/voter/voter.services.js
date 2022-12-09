import BaseService from "../base";

class VoterService extends BaseService {
	get entity() {
		return "voters";
	}
	async create(data) {
		try {
			return await this.request().post(`/${this.entity}`, data);
		} catch (error) {
			console.log(error);
		}
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
			return await this.request().put(`/${this.entity}/${data.id}`, data);
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

	async verify(email, token, password) {
		try {
			return await this.request().get(`/${this.entity}/verify?email=${email}&token=${token}&password=${password}`)
		} catch (e) {
			console.log(e);
		}
	}

}

export default new VoterService();
