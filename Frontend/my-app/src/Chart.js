import { Chart, registerables } from "chart.js";
import axios from "axios";

Chart.register(...registerables);

async function getChart(id) {
	const res = await axios({
		method: "GET",
		url: `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=30&interval=daily`,
	});

	Date.prototype.addDays = function (days) {
		let dat = new Date(this.valueOf());
		dat.setDate(dat.getDate() - days);
		return dat;
	};

	function getDates(startDate, stopDate) {
		let dateArray = new Array();
		let currentDate = startDate;
		while (currentDate >= stopDate) {
			dateArray.push(currentDate);
			currentDate = currentDate.addDays(1);
		}
		return dateArray;
	}
	let delayed;
	new Chart(document.getElementById("myChart"), {
		type: "line",
		data: {
			labels: getDates(new Date(), new Date().addDays(30)).reverse(),
			datasets: [
				{
					label: "$",
					data: res.data.prices,
					borderColor: "rgba(46,49,72,1)",
					borderJoinStyle: "round",
					borderCapStyle: "round",
					borderWidth: 3,
					pointRadius: 0,
					pointHitRadius: 10,
					lineTension: 0.2,
				},
			],
		},
		options: {
			plugins: {
				legend: {
					display: false,
				},
				title: {
					display: false,
				},
				tooltips: {
					title: "",
				},
			},
			scales: {
				y: {
					ticks: {
						display: true,
					},
				},
				x: {
					ticks: {
						display: false,
					},
				},
			},
			animation: {
				onComplete: () => {
					delayed = true;
				},
				delay: (context) => {
					let delay = 0;
					if (
						context.type === "data" &&
						context.mode === "default" &&
						!delayed
					) {
						delay =
							context.dataIndex * 100 + context.datasetIndex * 50;
					}
					return delay;
				},
			},
		},
	});
}

export default getChart;
