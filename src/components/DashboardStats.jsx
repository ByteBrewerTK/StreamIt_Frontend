const DashboardStats = ({ stats }) => {
	return (
		<div className="grid grid-cols-2 gap-4 md:grid-cols-4">
			<StatCard
				title="Total Views"
				value={stats.totalViews || 0}
				color="blue"
			/>
			<StatCard
				title="Subscribers"
				value={stats.totalSubscribers || 0}
				color="green"
			/>
			<StatCard
				title="Total Likes"
				value={stats.totalLikes || 0}
				color="pink"
			/>
			<StatCard
				title="Total Videos"
				value={stats.totalVideos || 0}
				color="purple"
			/>
		</div>
	);
};

const StatCard = ({ title, value, color }) => (
	<div className={`p-4 bg-${color}-100 rounded shadow`}>
		<h3 className="text-xl font-semibold">{title}</h3>
		<p className="mt-2 text-2xl font-bold text-${color}-700">{value}</p>
	</div>
);

export default DashboardStats;
