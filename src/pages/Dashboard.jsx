import { useState, useEffect } from "react";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	BarElement,
	ArcElement,
	Title,
	Tooltip,
	Legend,
	Filler,
} from "chart.js";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import {
	TrendingUp,
	Users,
	Video,
	Eye,
	ThumbsUp,
	MessageSquare,
	Award,
	Calendar,
	BarChart2,
	Activity,
	Clock,
} from "lucide-react";

// Register ChartJS components
ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	BarElement,
	ArcElement,
	Title,
	Tooltip,
	Legend,
	Filler
);

const Dashboard = () => {
	const [activeTab, setActiveTab] = useState("overview");
	const [dashboardData, setDashboardData] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Simulating API call to fetch dashboard data
		const fetchDashboardData = async () => {
			try {
				// TODO: make api calls for dynamic data
				const mockData = {
					channelOverview: {
						totalVideos: 48,
						totalViews: 1247890,
						totalLikes: 78500,
						totalComments: 12350,
						totalSubscribers: 25600,
						engagementRate: 7.28,
						averageVideoLength: 724, // in seconds
					},
					videoPerformance: {
						topVideos: [
							{
								_id: "1",
								title: "How to Build a React App",
								views: 45800,
							},
							{
								_id: "2",
								title: "MongoDB Crash Course",
								views: 38200,
							},
							{
								_id: "3",
								title: "Node.js Tutorial for Beginners",
								views: 29400,
							},
							{
								_id: "4",
								title: "Full Stack Development Explained",
								views: 24700,
							},
							{
								_id: "5",
								title: "JavaScript Tips and Tricks",
								views: 19500,
							},
						],
						latestVideos: [
							{
								_id: "6",
								title: "Tailwind CSS Masterclass",
								views: 8700,
								createdAt: "2025-05-02T10:30:00.000Z",
							},
							{
								_id: "7",
								title: "Redux Toolkit Tutorial",
								views: 12400,
								createdAt: "2025-04-25T14:15:00.000Z",
							},
							{
								_id: "8",
								title: "GraphQL vs REST API",
								views: 15600,
								createdAt: "2025-04-18T09:20:00.000Z",
							},
							{
								_id: "9",
								title: "Docker for Web Developers",
								views: 18200,
								createdAt: "2025-04-10T16:45:00.000Z",
							},
							{
								_id: "10",
								title: "Web Security Best Practices",
								views: 14300,
								createdAt: "2025-04-03T11:10:00.000Z",
							},
						],
					},
					trends: {
						viewsByDate: [
							{ _id: "2025-05-07", views: 5890 },
							{ _id: "2025-05-08", views: 6230 },
							{ _id: "2025-05-09", views: 7450 },
							{ _id: "2025-05-10", views: 8120 },
							{ _id: "2025-05-11", views: 9340 },
							{ _id: "2025-05-12", views: 10250 },
							{ _id: "2025-05-13", views: 9870 },
							{ _id: "2025-05-14", views: 11230 },
						],
						likesByDate: [
							{ _id: "2025-05-07", count: 342 },
							{ _id: "2025-05-08", count: 389 },
							{ _id: "2025-05-09", count: 456 },
							{ _id: "2025-05-10", count: 512 },
							{ _id: "2025-05-11", count: 587 },
							{ _id: "2025-05-12", count: 624 },
							{ _id: "2025-05-13", count: 598 },
							{ _id: "2025-05-14", count: 673 },
						],
						commentsByDate: [
							{ _id: "2025-05-07", count: 78 },
							{ _id: "2025-05-08", count: 86 },
							{ _id: "2025-05-09", count: 104 },
							{ _id: "2025-05-10", count: 118 },
							{ _id: "2025-05-11", count: 132 },
							{ _id: "2025-05-12", count: 145 },
							{ _id: "2025-05-13", count: 137 },
							{ _id: "2025-05-14", count: 156 },
						],
						subscribersByDate: [
							{ _id: "2025-05-07", count: 34 },
							{ _id: "2025-05-08", count: 42 },
							{ _id: "2025-05-09", count: 51 },
							{ _id: "2025-05-10", count: 48 },
							{ _id: "2025-05-11", count: 67 },
							{ _id: "2025-05-12", count: 73 },
							{ _id: "2025-05-13", count: 69 },
							{ _id: "2025-05-14", count: 85 },
						],
					},
					engagement: {
						mostLikedVideos: [
							{
								_id: "1",
								videoTitle: "How to Build a React App",
								count: 8750,
							},
							{
								_id: "2",
								videoTitle: "MongoDB Crash Course",
								count: 6430,
							},
							{
								_id: "3",
								videoTitle: "Node.js Tutorial for Beginners",
								count: 5170,
							},
							{
								_id: "4",
								videoTitle: "Full Stack Development Explained",
								count: 4320,
							},
							{
								_id: "5",
								videoTitle: "JavaScript Tips and Tricks",
								count: 3890,
							},
						],
						mostCommentedVideos: [
							{
								_id: "1",
								videoTitle: "How to Build a React App",
								count: 1240,
							},
							{
								_id: "2",
								videoTitle: "MongoDB Crash Course",
								count: 980,
							},
							{
								_id: "3",
								videoTitle: "Node.js Tutorial for Beginners",
								count: 850,
							},
							{
								_id: "4",
								videoTitle: "Full Stack Development Explained",
								count: 760,
							},
							{
								_id: "3",
								videoTitle: "JavaScript Tips and Tricks",
								count: 620,
							},
						],
					},
					audience: {
						demographics: {
							ageDistribution: [
								{ _id: "18-24", count: 5400 },
								{ _id: "25-34", count: 8700 },
								{ _id: "35-44", count: 6800 },
								{ _id: "45-54", count: 3100 },
								{ _id: "55+", count: 1600 },
							],
							genderDistribution: [
								{ _id: "Male", count: 14800 },
								{ _id: "Female", count: 9300 },
								{ _id: "Other", count: 1500 },
							],
							locationDistribution: [
								{ _id: "United States", count: 8900 },
								{ _id: "India", count: 4200 },
								{ _id: "United Kingdom", count: 2800 },
								{ _id: "Germany", count: 1900 },
								{ _id: "Canada", count: 1600 },
								{ _id: "Australia", count: 1200 },
								{ _id: "Brazil", count: 1100 },
								{ _id: "France", count: 950 },
								{ _id: "Spain", count: 750 },
								{ _id: "Italy", count: 650 },
							],
						},
					},
				};

				setDashboardData(mockData);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching dashboard data:", error);
				setLoading(false);
			}
		};

		fetchDashboardData();
	}, []);

	// Format number with commas
	const formatNumber = (num) => {
		return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	};

	// Format seconds to minutes and seconds
	const formatDuration = (seconds) => {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes}:${
			remainingSeconds < 10 ? "0" : ""
		}${remainingSeconds}`;
	};

	if (loading) {
		return (
			<div className="flex items-center justify-center h-screen">
				<div className="w-12 h-12 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
			</div>
		);
	}

	// Prepare chart data
	const viewsChartData = {
		labels: dashboardData.trends.viewsByDate.map((item) =>
			item._id.substring(5)
		),
		datasets: [
			{
				label: "Views",
				data: dashboardData.trends.viewsByDate.map(
					(item) => item.views
				),
				borderColor: "rgb(53, 162, 235)",
				backgroundColor: "rgba(53, 162, 235, 0.5)",
				tension: 0.3,
				fill: true,
			},
		],
	};

	const engagementChartData = {
		labels: dashboardData.trends.likesByDate.map((item) =>
			item._id.substring(5)
		),
		datasets: [
			{
				label: "Likes",
				data: dashboardData.trends.likesByDate.map(
					(item) => item.count
				),
				borderColor: "rgb(255, 99, 132)",
				backgroundColor: "rgba(255, 99, 132, 0.5)",
				tension: 0.3,
			},
			{
				label: "Comments",
				data: dashboardData.trends.commentsByDate.map(
					(item) => item.count
				),
				borderColor: "rgb(75, 192, 192)",
				backgroundColor: "rgba(75, 192, 192, 0.5)",
				tension: 0.3,
			},
			{
				label: "Subscribers",
				data: dashboardData.trends.subscribersByDate.map(
					(item) => item.count
				),
				borderColor: "rgb(255, 205, 86)",
				backgroundColor: "rgba(255, 205, 86, 0.5)",
				tension: 0.3,
			},
		],
	};

	const topVideosChartData = {
		labels: dashboardData.videoPerformance.topVideos.map(
			(video) => video.title
		),
		datasets: [
			{
				label: "Views",
				data: dashboardData.videoPerformance.topVideos.map(
					(video) => video.views
				),
				backgroundColor: "rgba(53, 162, 235, 0.8)",
			},
		],
	};

	const audienceAgeChartData = {
		labels: dashboardData.audience.demographics.ageDistribution.map(
			(item) => item._id
		),
		datasets: [
			{
				label: "Subscribers",
				data: dashboardData.audience.demographics.ageDistribution.map(
					(item) => item.count
				),
				backgroundColor: [
					"rgba(255, 99, 132, 0.8)",
					"rgba(54, 162, 235, 0.8)",
					"rgba(255, 206, 86, 0.8)",
					"rgba(75, 192, 192, 0.8)",
					"rgba(153, 102, 255, 0.8)",
				],
				borderColor: [
					"rgba(255, 99, 132, 1)",
					"rgba(54, 162, 235, 1)",
					"rgba(255, 206, 86, 1)",
					"rgba(75, 192, 192, 1)",
					"rgba(153, 102, 255, 1)",
				],
				borderWidth: 1,
			},
		],
	};

	const audienceGenderChartData = {
		labels: dashboardData.audience.demographics.genderDistribution.map(
			(item) => item._id
		),
		datasets: [
			{
				label: "Gender",
				data: dashboardData.audience.demographics.genderDistribution.map(
					(item) => item.count
				),
				backgroundColor: [
					"rgba(54, 162, 235, 0.8)",
					"rgba(255, 99, 132, 0.8)",
					"rgba(255, 206, 86, 0.8)",
				],
				borderColor: [
					"rgba(54, 162, 235, 1)",
					"rgba(255, 99, 132, 1)",
					"rgba(255, 206, 86, 1)",
				],
				borderWidth: 1,
			},
		],
	};

	const locationChartData = {
		labels: dashboardData.audience.demographics.locationDistribution
			.slice(0, 5)
			.map((item) => item._id),
		datasets: [
			{
				label: "Subscribers",
				data: dashboardData.audience.demographics.locationDistribution
					.slice(0, 5)
					.map((item) => item.count),
				backgroundColor: [
					"rgba(255, 99, 132, 0.8)",
					"rgba(54, 162, 235, 0.8)",
					"rgba(255, 206, 86, 0.8)",
					"rgba(75, 192, 192, 0.8)",
					"rgba(153, 102, 255, 0.8)",
				],
			},
		],
	};

	return (
		<div className="w-full h-full overflow-y-auto bg-secondary">
			{/* Header */}
			<header className="bg-primaryshadow ">
				<div className="flex items-center justify-between px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
					<h1 className="text-3xl font-bold text-white">
						Channel Dashboard
					</h1>
					<div className="flex space-x-4">
						<div className="relative">
							<select className="py-2 pl-3 pr-10 bg-white border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500">
								<option>Last 7 days</option>
								<option>Last 30 days</option>
								<option>Last 90 days</option>
								<option>This year</option>
								<option>All time</option>
							</select>
						</div>
						<button className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
							Export Data
						</button>
					</div>
				</div>
			</header>

			{/* Main content */}
			<main className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
				{/* Tabs */}
				<div className="flex mb-6 space-x-4 ">
					<button
						className={`pb-4 px-1 ${
							activeTab === "overview"
								? "border-b-2 border-white text-white"
								: "text-gray-500 hover:text-gray-300"
						} font-medium`}
						onClick={() => setActiveTab("overview")}
					>
						Overview
					</button>
					<button
						className={`pb-4 px-1 ${
							activeTab === "content"
								? "border-b-2 border-white text-white"
								: "text-gray-500 hover:text-gray-300"
						} font-medium`}
						onClick={() => setActiveTab("content")}
					>
						Content
					</button>
					<button
						className={`pb-4 px-1 ${
							activeTab === "audience"
								? "border-b-2 border-white text-white"
								: "text-gray-500 hover:text-gray-300"
						} font-medium`}
						onClick={() => setActiveTab("audience")}
					>
						Audience
					</button>
				</div>

				{/* Overview Tab */}
				{activeTab === "overview" && (
					<>
						{/* Stats Cards */}
						<div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
							<div className="p-6 bg-white rounded-lg shadow">
								<div className="flex items-center">
									<div className="p-3 text-blue-600 bg-blue-100 rounded-full">
										<Eye size={24} />
									</div>
									<div className="ml-4">
										<p className="text-sm font-medium text-gray-500">
											Total Views
										</p>
										<h3 className="text-xl font-semibold text-gray-900">
											{formatNumber(
												dashboardData.channelOverview
													.totalViews
											)}
										</h3>
									</div>
								</div>
							</div>

							<div className="p-6 bg-white rounded-lg shadow">
								<div className="flex items-center">
									<div className="p-3 text-green-600 bg-green-100 rounded-full">
										<Users size={24} />
									</div>
									<div className="ml-4">
										<p className="text-sm font-medium text-gray-500">
											Subscribers
										</p>
										<h3 className="text-xl font-semibold text-gray-900">
											{formatNumber(
												dashboardData.channelOverview
													.totalSubscribers
											)}
										</h3>
									</div>
								</div>
							</div>

							<div className="p-6 bg-white rounded-lg shadow">
								<div className="flex items-center">
									<div className="p-3 text-purple-600 bg-purple-100 rounded-full">
										<Video size={24} />
									</div>
									<div className="ml-4">
										<p className="text-sm font-medium text-gray-500">
											Total Videos
										</p>
										<h3 className="text-xl font-semibold text-gray-900">
											{
												dashboardData.channelOverview
													.totalVideos
											}
										</h3>
									</div>
								</div>
							</div>

							<div className="p-6 bg-white rounded-lg shadow">
								<div className="flex items-center">
									<div className="p-3 text-red-600 bg-red-100 rounded-full">
										<Activity size={24} />
									</div>
									<div className="ml-4">
										<p className="text-sm font-medium text-gray-500">
											Engagement Rate
										</p>
										<h3 className="text-xl font-semibold text-gray-900">
											{
												dashboardData.channelOverview
													.engagementRate
											}
											%
										</h3>
									</div>
								</div>
							</div>
						</div>

						<div className="grid grid-cols-1 gap-6 mb-8 lg:grid-cols-2">
							{/* Views Trend Chart */}
							<div className="p-6 bg-white rounded-lg shadow">
								<h2 className="mb-4 text-lg font-semibold text-gray-900">
									Views Trend
								</h2>
								<div className="h-64">
									<Line
										data={viewsChartData}
										options={{
											responsive: true,
											maintainAspectRatio: false,
											scales: {
												y: {
													beginAtZero: true,
												},
											},
											plugins: {
												legend: {
													display: false,
												},
											},
										}}
									/>
								</div>
							</div>

							{/* Engagement Metrics */}
							<div className="p-6 bg-white rounded-lg shadow">
								<h2 className="mb-4 text-lg font-semibold text-gray-900">
									Engagement Trends
								</h2>
								<div className="h-64">
									<Line
										data={engagementChartData}
										options={{
											responsive: true,
											maintainAspectRatio: false,
											scales: {
												y: {
													beginAtZero: true,
												},
											},
										}}
									/>
								</div>
							</div>
						</div>

						<div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
							{/* Top Videos */}
							<div className="p-6 bg-white rounded-lg shadow lg:col-span-2">
								<h2 className="mb-4 text-lg font-semibold text-gray-900">
									Top Performing Videos
								</h2>
								<div className="h-80">
									<Bar
										data={topVideosChartData}
										options={{
											indexAxis: "y",
											responsive: true,
											maintainAspectRatio: false,
											plugins: {
												legend: {
													display: false,
												},
											},
											scales: {
												x: {
													beginAtZero: true,
												},
											},
										}}
									/>
								</div>
							</div>

							{/* Summary Stats */}
							<div className="p-6 bg-white rounded-lg shadow">
								<h2 className="mb-4 text-lg font-semibold text-gray-900">
									Quick Stats
								</h2>
								<div className="space-y-4">
									<div className="flex items-center justify-between">
										<div className="flex items-center">
											<div className="p-2 text-blue-600 bg-blue-100 rounded-full">
												<ThumbsUp size={18} />
											</div>
											<span className="ml-2 text-gray-700">
												Total Likes
											</span>
										</div>
										<span className="font-semibold">
											{formatNumber(
												dashboardData.channelOverview
													.totalLikes
											)}
										</span>
									</div>

									<div className="flex items-center justify-between">
										<div className="flex items-center">
											<div className="p-2 text-green-600 bg-green-100 rounded-full">
												<MessageSquare size={18} />
											</div>
											<span className="ml-2 text-gray-700">
												Total Comments
											</span>
										</div>
										<span className="font-semibold">
											{formatNumber(
												dashboardData.channelOverview
													.totalComments
											)}
										</span>
									</div>

									<div className="flex items-center justify-between">
										<div className="flex items-center">
											<div className="p-2 text-purple-600 bg-purple-100 rounded-full">
												<Award size={18} />
											</div>
											<span className="ml-2 text-gray-700">
												Avg. Engagement
											</span>
										</div>
										<span className="font-semibold">
											{
												dashboardData.channelOverview
													.engagementRate
											}
											%
										</span>
									</div>

									<div className="flex items-center justify-between">
										<div className="flex items-center">
											<div className="p-2 text-yellow-600 bg-yellow-100 rounded-full">
												<Clock size={18} />
											</div>
											<span className="ml-2 text-gray-700">
												Avg. Video Length
											</span>
										</div>
										<span className="font-semibold">
											{Math.floor(
												dashboardData.channelOverview
													.averageVideoLength / 60
											)}{" "}
											min
										</span>
									</div>

									<div className="pt-4">
										<button className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
											View Detailed Analytics
										</button>
									</div>
								</div>
							</div>
						</div>
					</>
				)}

				{/* Content Tab */}
				{activeTab === "content" && (
					<>
						<div className="grid grid-cols-1 gap-6 mb-8">
							{/* Top Videos Table */}
							<div className="overflow-hidden bg-white rounded-lg shadow">
								<div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
									<h2 className="text-lg font-semibold text-gray-900">
										Video Performance
									</h2>
								</div>
								<div className="overflow-x-auto">
									<table className="min-w-full divide-y divide-gray-200">
										<thead className="bg-gray-50">
											<tr>
												<th
													scope="col"
													className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
												>
													Video Title
												</th>
												<th
													scope="col"
													className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
												>
													Views
												</th>
												<th
													scope="col"
													className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
												>
													Likes
												</th>
												<th
													scope="col"
													className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
												>
													Comments
												</th>
												<th
													scope="col"
													className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
												>
													Engagement
												</th>
											</tr>
										</thead>
										<tbody className="bg-white divide-y divide-gray-200">
											{dashboardData.videoPerformance.topVideos.map(
												(video, index) => {
													// Match with engagement data
													const likeData =
														dashboardData.engagement.mostLikedVideos.find(
															(v) =>
																v._id ===
																video._id
														) || { count: 0 };
													const commentData =
														dashboardData.engagement.mostCommentedVideos.find(
															(v) =>
																v._id ===
																video._id
														) || { count: 0 };
													const engagementRate =
														video.views > 0
															? (
																	((likeData.count +
																		commentData.count) /
																		video.views) *
																	100
															  ).toFixed(1)
															: 0;

													return (
														<tr key={video._id}>
															<td className="px-6 py-4 whitespace-nowrap">
																<div className="flex items-center">
																	<div className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-gray-500 bg-gray-200 rounded">
																		<Video
																			size={
																				16
																			}
																		/>
																	</div>
																	<div className="ml-4">
																		<div className="text-sm font-medium text-gray-900">
																			{
																				video.title
																			}
																		</div>
																	</div>
																</div>
															</td>
															<td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
																{formatNumber(
																	video.views
																)}
															</td>
															<td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
																{formatNumber(
																	likeData.count
																)}
															</td>
															<td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
																{formatNumber(
																	commentData.count
																)}
															</td>
															<td className="px-6 py-4 whitespace-nowrap">
																<div className="text-sm text-gray-900">
																	{
																		engagementRate
																	}
																	%
																</div>
																<div className="w-full bg-gray-200 rounded-full h-2.5">
																	<div
																		className="bg-blue-600 h-2.5 rounded-full"
																		style={{
																			width: `${Math.min(
																				engagementRate *
																					5,
																				100
																			)}%`,
																		}}
																	></div>
																</div>
															</td>
														</tr>
													);
												}
											)}
										</tbody>
									</table>
								</div>
							</div>

							{/* Recent Videos */}
							<div className="overflow-hidden bg-white rounded-lg shadow">
								<div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
									<h2 className="text-lg font-semibold text-gray-900">
										Recent Uploads
									</h2>
								</div>
								<ul className="divide-y divide-gray-200">
									{dashboardData.videoPerformance.latestVideos.map(
										(video) => (
											<li
												key={video._id}
												className="px-6 py-4"
											>
												<div className="flex items-center justify-between">
													<div className="flex items-center">
														<div className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-gray-500 bg-gray-200 rounded">
															<Video size={16} />
														</div>
														<div className="ml-4">
															<div className="text-sm font-medium text-gray-900">
																{video.title}
															</div>
															<div className="text-sm text-gray-500">
																{new Date(
																	video.createdAt
																).toLocaleDateString(
																	"en-US",
																	{
																		year: "numeric",
																		month: "short",
																		day: "numeric",
																	}
																)}
															</div>
														</div>
													</div>
													<div className="flex items-center">
														<div className="flex items-center mr-6">
															<Eye
																size={16}
																className="text-gray-400"
															/>
															<span className="ml-1 text-sm text-gray-500">
																{formatNumber(
																	video.views
																)}
															</span>
														</div>
														<button className="px-3 py-1 text-xs border border-gray-300 rounded-md hover:bg-gray-50">
															View Details
														</button>
													</div>
												</div>
											</li>
										)
									)}
								</ul>
								<div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
									<button className="text-sm font-medium text-blue-600 hover:text-blue-800">
										View All Videos
									</button>
								</div>
							</div>

							{/* Engagement Breakdown */}
							<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
								<div className="p-6 bg-white rounded-lg shadow">
									<h2 className="mb-4 text-lg font-semibold text-gray-900">
										Most Liked Videos
									</h2>
									<ul className="space-y-4">
										{dashboardData.engagement.mostLikedVideos.map(
											(video, index) => (
												<li
													key={video._id}
													className="flex items-center"
												>
													<span className="flex-shrink-0 w-6 font-medium text-gray-500">
														{index + 1}.
													</span>
													<div className="flex-grow ml-2">
														<div className="text-sm font-medium text-gray-900 truncate">
															{video.videoTitle}
														</div>
														<div className="flex items-center mt-1">
															<ThumbsUp
																size={14}
																className="text-red-500"
															/>
															<span className="ml-1 text-xs text-gray-500">
																{formatNumber(
																	video.count
																)}{" "}
																likes
															</span>
														</div>
													</div>
												</li>
											)
										)}
									</ul>
								</div>

								<div className="p-6 bg-white rounded-lg shadow">
									<h2 className="mb-4 text-lg font-semibold text-gray-900">
										Most Commented Videos
									</h2>
									<ul className="space-y-4">
										{dashboardData.engagement.mostCommentedVideos.map(
											(video, index) => (
												<li
													key={video._id}
													className="flex items-center"
												>
													<span className="flex-shrink-0 w-6 font-medium text-gray-500">
														{index + 1}.
													</span>
													<div className="flex-grow ml-2">
														<div className="text-sm font-medium text-gray-900 truncate">
															{video.videoTitle}
														</div>
														<div className="flex items-center mt-1">
															<MessageSquare
																size={14}
																className="text-green-500"
															/>
															<span className="ml-1 text-xs text-gray-500">
																{formatNumber(
																	video.count
																)}{" "}
																comments
															</span>
														</div>
													</div>
												</li>
											)
										)}
									</ul>
								</div>
							</div>
						</div>
					</>
				)}

				{/* Audience Tab */}
				{activeTab === "audience" && (
					<>
						<div className="grid grid-cols-1 gap-6 mb-8 lg:grid-cols-2">
							{/* Audience Age Distribution */}
							<div className="p-6 bg-white rounded-lg shadow">
								<h2 className="mb-4 text-lg font-semibold text-gray-900">
									Age Distribution
								</h2>
								<div className="h-64">
									<Bar
										data={audienceAgeChartData}
										options={{
											responsive: true,
											maintainAspectRatio: false,
											plugins: {
												legend: {
													display: false,
												},
											},
											scales: {
												y: {
													beginAtZero: true,
												},
											},
										}}
									/>
								</div>
							</div>

							{/* Audience Gender Distribution */}
							<div className="p-6 bg-white rounded-lg shadow">
								<h2 className="mb-4 text-lg font-semibold text-gray-900">
									Gender Distribution
								</h2>
								<div className="flex items-center justify-center h-64">
									<div className="w-48">
										<Doughnut
											data={audienceGenderChartData}
											options={{
												responsive: true,
												maintainAspectRatio: false,
												plugins: {
													legend: {
														position: "bottom",
													},
												},
											}}
										/>
									</div>
								</div>
							</div>
						</div>

						{/* Geographic Distribution */}
						<div className="grid grid-cols-1 gap-6 mb-8">
							<div className="p-6 bg-white rounded-lg shadow">
								<h2 className="mb-4 text-lg font-semibold text-gray-900">
									Top Locations
								</h2>
								<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
									<div className="h-64">
										<Bar
											data={locationChartData}
											options={{
												indexAxis: "y",
												responsive: true,
												maintainAspectRatio: false,
												plugins: {
													legend: {
														display: false,
													},
												},
												scales: {
													x: {
														beginAtZero: true,
													},
												},
											}}
										/>
									</div>
									<div>
										<div className="p-4 mb-4 rounded-lg bg-gray-50">
											<h3 className="mb-2 text-sm font-medium text-gray-700">
												Audience Insights
											</h3>
											<p className="text-sm text-gray-600">
												Your channel has viewers from 78
												countries worldwide, with the
												highest concentration in the
												United States (34.8%), India
												(16.4%), and the United Kingdom
												(10.9%).
											</p>
										</div>
										<table className="min-w-full divide-y divide-gray-200">
											<thead className="bg-gray-50">
												<tr>
													<th
														scope="col"
														className="px-3 py-2 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
													>
														Country
													</th>
													<th
														scope="col"
														className="px-3 py-2 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
													>
														Subscribers
													</th>
													<th
														scope="col"
														className="px-3 py-2 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
													>
														%
													</th>
												</tr>
											</thead>
											<tbody className="bg-white divide-y divide-gray-200">
												{dashboardData.audience.demographics.locationDistribution.map(
													(location) => {
														const percentage = (
															(location.count /
																dashboardData
																	.channelOverview
																	.totalSubscribers) *
															100
														).toFixed(1);
														return (
															<tr
																key={
																	location._id
																}
															>
																<td className="px-3 py-2 text-sm text-gray-900 whitespace-nowrap">
																	{
																		location._id
																	}
																</td>
																<td className="px-3 py-2 text-sm text-gray-500 whitespace-nowrap">
																	{formatNumber(
																		location.count
																	)}
																</td>
																<td className="px-3 py-2 text-sm text-gray-500 whitespace-nowrap">
																	{percentage}
																	%
																</td>
															</tr>
														);
													}
												)}
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>

						{/* Audience Engagement & Growth */}
						<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
							<div className="p-6 bg-white rounded-lg shadow">
								<h2 className="mb-4 text-lg font-semibold text-gray-900">
									Subscriber Growth
								</h2>
								<div className="h-64">
									<Line
										data={{
											labels: dashboardData.trends.subscribersByDate.map(
												(item) => item._id.substring(5)
											),
											datasets: [
												{
													label: "New Subscribers",
													data: dashboardData.trends.subscribersByDate.map(
														(item) => item.count
													),
													borderColor:
														"rgb(75, 192, 192)",
													backgroundColor:
														"rgba(75, 192, 192, 0.5)",
													tension: 0.3,
													fill: true,
												},
											],
										}}
										options={{
											responsive: true,
											maintainAspectRatio: false,
											scales: {
												y: {
													beginAtZero: true,
												},
											},
											plugins: {
												legend: {
													display: false,
												},
											},
										}}
									/>
								</div>
							</div>

							<div className="p-6 bg-white rounded-lg shadow">
								<h2 className="mb-4 text-lg font-semibold text-gray-900">
									Audience Retention
								</h2>
								<div className="p-4 mb-4 rounded-lg bg-gray-50">
									<p className="text-sm text-gray-600">
										Your channel's average watch time is
										5:32 minutes, which is 24% higher than
										similar channels in your category.
									</p>
								</div>
								<div className="space-y-4">
									<div>
										<div className="flex justify-between mb-1">
											<span className="text-sm font-medium text-gray-700">
												Returning Viewers
											</span>
											<span className="text-sm font-medium text-gray-700">
												68%
											</span>
										</div>
										<div className="w-full bg-gray-200 rounded-full h-2.5">
											<div
												className="bg-green-600 h-2.5 rounded-full"
												style={{ width: "68%" }}
											></div>
										</div>
									</div>

									<div>
										<div className="flex justify-between mb-1">
											<span className="text-sm font-medium text-gray-700">
												New Viewers
											</span>
											<span className="text-sm font-medium text-gray-700">
												32%
											</span>
										</div>
										<div className="w-full bg-gray-200 rounded-full h-2.5">
											<div
												className="bg-blue-600 h-2.5 rounded-full"
												style={{ width: "32%" }}
											></div>
										</div>
									</div>

									<div>
										<div className="flex justify-between mb-1">
											<span className="text-sm font-medium text-gray-700">
												Subscriber Watch Time
											</span>
											<span className="text-sm font-medium text-gray-700">
												7:12 mins
											</span>
										</div>
										<div className="w-full bg-gray-200 rounded-full h-2.5">
											<div
												className="bg-purple-600 h-2.5 rounded-full"
												style={{ width: "75%" }}
											></div>
										</div>
									</div>

									<div>
										<div className="flex justify-between mb-1">
											<span className="text-sm font-medium text-gray-700">
												Non-Subscriber Watch Time
											</span>
											<span className="text-sm font-medium text-gray-700">
												3:45 mins
											</span>
										</div>
										<div className="w-full bg-gray-200 rounded-full h-2.5">
											<div
												className="bg-yellow-600 h-2.5 rounded-full"
												style={{ width: "40%" }}
											></div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</>
				)}
			</main>

			{/* Footer */}
			<footer className="mt-12 border-t border-gray-200 border-gray-500 bg-secondary">
				<div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
					<div className="flex items-center justify-between">
						<p className="text-sm text-gray-300">
							Last updated: May 14, 2025, 12:30 PM
						</p>
						<div className="flex space-x-4">
							<button className="text-sm text-gray-300 hover:text-white">
								Help
							</button>
							<button className="text-sm text-gray-300 hover:text-white">
								Feedback
							</button>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
};

export default Dashboard;
