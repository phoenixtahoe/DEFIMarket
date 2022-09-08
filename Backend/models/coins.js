const db = require("../db");
const bcrypt = require("bcrypt");
const {
	NotFoundError,
	BadRequestError,
	UnauthorizedError,
} = require("../expressError");
const axios = require("axios");
const { BCRYPT_WORK_FACTOR } = require("../config.js");

const api_url = "https://api.coingecko.com/api/v3/";

class Coin {
	static async updateCoins() {
		const res = await axios.get(api_url + "coins/markets", {
			params: { vs_currency: "USD", per_page: 100 },
		});
		let data = res.data.map((data) => data.id);

		data.forEach((e) => {
			db.query(
				`INSERT INTO coins (symbol)
									 VALUES ($1)`,
				[e]
			);
		});
	}

	static async getAll() {
		const res = await axios.get(api_url + "coins/markets", {
			params: { vs_currency: "USD", per_page: 100 },
		});

		// await this.updateCoins()

		return res;
	}

	static async getFavorites(ids) {
		const res = await axios.get(api_url + "coins/markets", {
			params: {
				vs_currency: "USD",
				ids: ids.join(",") || ids,
				localization: false,
				tickers: false,
				market_data: true,
				community_data: false,
				developer_data: false,
			},
		});
		return res;
	}

	static async get(id) {
		const res = await axios.get(api_url + "coins/" + id, {
			params: {
				localization: false,
				tickers: false,
				market_data: true,
				community_data: false,
				developer_data: false,
			},
		});
		return res;
	}
}

module.exports = Coin;
