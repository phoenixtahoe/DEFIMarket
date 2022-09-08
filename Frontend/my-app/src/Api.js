import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class TokenApi {
	static token;

	static async request(endpoint, data = {}, method = "get") {
		console.debug("API Call:", endpoint, data, method);

		const url = `${BASE_URL}/${endpoint}`;
		const headers = { Authorization: `Bearer ${TokenApi.token}` };
		const params = method === "get" ? data : {};

		try {
			return (await axios({ url, method, data, params, headers })).data;
		} catch (err) {
			console.error("API Error:", err.response);
			let message = err.response.data.error.message;
			throw Array.isArray(message) ? message : [message];
		}
	}

	static async getCoin(coins) {
		let res = await this.request(`coins/${coins}`);
		return res;
	}

	static async getCoins() {
		let res = await this.request(`coins/`);
		return res;
	}

	static async renderFavorites(ids) {
		let res = await this.request(`favorites/`, { ids });
		return res;
	}

	static async getFavorites(username) {
		let res = await this.request(`favorites/${username}`);
		return res;
	}

	static async login(data) {
		let res = await this.request(`auth/token`, data, "post");
		return res.token;
	}

	static async signup(data) {
		let res = await this.request(`auth/register`, data, "post");
		return res.token;
	}

	static async getUser(username) {
		let res = await this.request(`users/${username}`);
		return res.user;
	}

	static async applyToFavorites(username, id) {
		await this.request(`favorites/${username}/${id}`, {}, "post");
	}

	static async delFromFavorites(username, id) {
		await this.request(`favorites/${username}/${id}`, {}, "delete");
	}
}

export default TokenApi;
