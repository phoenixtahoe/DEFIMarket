"use strict";

const db = require("../db");
const { NotFoundError } = require("../expressError");

class Favorites {
	static async get(username) {
		const res = await db.query(
			`SELECT id FROM favorites WHERE username = $1`,
			[username]
		);

    const favs = res.rows.map(e => (e.id))

		return favs;
	}

	static async add(username, coin_id) {
		await db.query(
			`INSERT INTO favorites (username, id)
            VALUES ($1, $2)`,
			[username, coin_id]
		);
	}

	static async remove(username, id) {
		const result = await db.query(
			`DELETE
           FROM favorites
           WHERE id = $1
           AND username = $2
           RETURNING id`,
			[id, username]
		);
		const coin_id = result.rows[0];
	}
}

module.exports = Favorites;
