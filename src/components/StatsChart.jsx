import { Bar, Doughnut } from "react-chartjs-2";
import Chart from "chart.js/auto";


const StatsChart = ({ videos }) => {
	const viewsData = videos.map((v) => v.views);
	const likesData = videos.map((v) => v.likes || 0);
	const labels = videos.map((v) => v.title);

	const barData = {
		labels,
		datasets: [
			{
				label: "Views",
				data: viewsData,
				backgroundColor: "rgba(59,130,246,0.6)",
			},
			{
				label: "Likes",
				data: likesData,
				backgroundColor: "rgba(236,72,153,0.6)",
			},
		],
	};

	const doughnutData = {
		labels,
		datasets: [
			{
				data: viewsData,
				backgroundColor: [
					"#3B82F6",
					"#10B981",
					"#F59E0B",
					"#EF4444",
					"#8B5CF6",
				],
			},
		],
	};

	return (
		<div className="grid grid-cols-1 gap-8 md:grid-cols-2">
			<div className="p-4 bg-white rounded shadow">
				<h2 className="mb-4 text-lg font-semibold">
					Views & Likes per Video
				</h2>
				<Bar data={barData} />
			</div>
			<div className="p-4 bg-white rounded shadow">
				<h2 className="mb-4 text-lg font-semibold">
					Views Distribution
				</h2>
				<Doughnut data={doughnutData} />
			</div>
		</div>
	);
};

export default StatsChart;
