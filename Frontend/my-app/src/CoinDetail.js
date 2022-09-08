import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TokenApi from "./Api";
import LoadingSpinner from "./LoadingSpinner";
import getChart from "./Chart";
import UserContext from "./UserContext";

function CoinDetail() {
	const [loading, setLoading] = useState(false);
	const { symbol } = useParams();
	const [coin, setCoin] = useState([]);
	const [favorited, setFavorites] = useState([]);
	const { hasFavorites, applyToFavorites, currentUser } =
		useContext(UserContext);

	function formatStringtoNum(num) {
		return num.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
	}

	async function handleFavorites(evt) {
		if (hasFavorites(symbol)) {
			applyToFavorites(symbol);
			setFavorites(false);
		} else {
			applyToFavorites(symbol);
			setFavorites(true);
		}
	}

	useEffect(() => {
		async function getCoin() {
			setCoin(await TokenApi.getCoin(symbol));
			getChart(symbol);
			setLoading(true);
		}
		setLoading(false);
		getCoin();
	}, [symbol, setLoading]);

	useEffect(() => {
		setFavorites(hasFavorites(symbol));
	}, [symbol, hasFavorites]);

	if (!loading) return <LoadingSpinner />;

	return (
		<div className='container'>
			<div className='text-center'>
				<h1 className=''>
					<img
						className='img-responsive'
						src={coin.image.small}
						alt={coin.name}
					></img>
					{coin.name}
				</h1>

				<div>
					<table className='table table-hover'>
						<thead>
							<tr>
								<th>Name</th>
								<th>Symbol</th>
								<th>Price</th>
								<th>24hr</th>
								<th>30d</th>
								<th>24hr Price Change</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>{coin.name}</td>
								<td>{coin.symbol.toUpperCase()}</td>
								<td>
									$
									{formatStringtoNum(
										coin.market_data.current_price.usd
									)}
								</td>
								<td
									style={{
										color:
											Number(
												coin.market_data
													.price_change_percentage_24h
											) > 0
												? "lightgreen"
												: "red",
									}}
								>
									{
										coin.market_data
											.price_change_percentage_24h
									}
									%
								</td>
								<td
									style={{
										color:
											Number(
												coin.market_data
													.price_change_percentage_24h
											) > 0
												? "lightgreen"
												: "red",
									}}
								>
									{
										coin.market_data
											.price_change_percentage_30d
									}
									%
								</td>
								<td
									style={{
										color:
											Number(
												coin.market_data
													.price_change_24h
											) > 0
												? "lightgreen"
												: "red",
									}}
								>
									$
									{formatStringtoNum(
										coin.market_data.price_change_24h
									)}
								</td>
							</tr>
						</tbody>
						<thead>
							<tr>
								<th>24hr High</th>
								<th>24hr Low</th>
								<th>Total Volume</th>
								<th>Market Cap</th>
								<th>Circulating Supply</th>
								<th>Favorite</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>
									$
									{formatStringtoNum(
										coin.market_data.high_24h.usd
									)}
								</td>
								<td>
									$
									{formatStringtoNum(
										coin.market_data.low_24h.usd
									)}
								</td>
								<td>
									$
									{formatStringtoNum(
										coin.market_data.total_volume.usd
									)}
								</td>
								<td>
									$
									{formatStringtoNum(
										coin.market_data.market_cap.usd
									)}
								</td>
								<td>
									$
									{formatStringtoNum(
										coin.market_data.circulating_supply
									)}
								</td>
								<td>
									{currentUser ? (
										<div onClick={handleFavorites}>
											{favorited ? (
												<i className='far fa-heart'></i>
											) : (
												<i className='fas fa-heart'></i>
											)}
										</div>
									) : (
										<div></div>
									)}
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div>
					<div
						dangerouslySetInnerHTML={{
							__html: coin.description.en,
						}}
					></div>

					<br />
					<h1>Price change over 30 Day's</h1>
					<br />
					<canvas
						id='myChart'
						style={{ position: "relative", height: "15vh" }}
					></canvas>
					<br />
				</div>
			</div>
		</div>
	);
}

export default CoinDetail;
