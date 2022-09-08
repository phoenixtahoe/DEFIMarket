import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UserContext from "./UserContext";

import TokenApi from "./Api";

function CoinList() {
	const [coins, setCoins] = useState([]);
	const [favorited, setFavorites] = useState([]);
	const { hasFavorites, applyToFavorites, getFavorites, currentUser } = useContext(UserContext);

	async function handleFavorites(id) {
		if (hasFavorites(id)) {
			applyToFavorites(id);
			setFavorites(false);
		} else {
			applyToFavorites(id);
			setFavorites(true);
		}
	}

	async function getCoins() {
		await getFavorites(currentUser.username);
		let coins = await TokenApi.getCoins();
		setCoins(coins);
	}

	function formatStringtoNum(num) {
		return num.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
	}

	useEffect(() => {
		getCoins();
	}, []);

	return (
		<div className='container text-center'>
			<table className='table table-responsive table-hover'>
				<thead className=''>
					<tr key='table'>
						<th scope='row'>Name</th>
						<th scope='row'>Symbol</th>
						<th scope='row'>Price</th>
						<th scope='row'>24hr</th>
						<th scope='row'>24hr Volume</th>
						<th scope='row'>Market Cap</th>
						<th scope='row'>Favorite</th>
					</tr>
				</thead>
				<tbody className=''>
					{coins.map((c) => (
						<tr key={c.id} id={c.id}>
							<th>
								<Link
									style={{
										color: "Black",
										textDecoration: "none",
									}}
									to={`/coins/${c.id}`}
									key={c.id}
								>
									{c.name}

									<img
										alt={c.name}
										src={c.image}
										width='25px'
										className='m-2'
									></img>
								</Link>
							</th>
							<td>{c.symbol.toUpperCase()}</td>
							<td>${formatStringtoNum(c.current_price)}</td>
							<td>{c.price_change_percentage_24h}%</td>
							<td>${formatStringtoNum(c.total_volume)}</td>
							<td>${formatStringtoNum(c.market_cap)}</td>
							<td>
								{currentUser ? (
									<div id={c.id}>
										{hasFavorites(c.id) ? (
											<i
												className='far fa-heart'
												onClick={() =>
													handleFavorites(c.id)
												}
											></i>
										) : (
											<i
												className='fas fa-heart'
												onClick={() =>
													handleFavorites(c.id)
												}
											></i>
										)}
									</div>
								) : (
									<div></div>
								)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default CoinList;
