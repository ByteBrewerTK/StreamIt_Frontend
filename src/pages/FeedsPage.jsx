import { useEffect } from "react";
import { apiRequest } from "../services/api";
import { useState } from "react";
import VideoItem from "../components/video/VideoItem";

const FeedsPage = () => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);

	const query = {
		limit: 10,
		page: 1,
		sortBy: "duration",
		sortType: "asc",
	};
	const url = `/video?limit=${query.limit}&page=${query.page}&sortBy=${query.sortBy}&sortType=${query.sortType}`;

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const { data } = await apiRequest(url);

				setData(data.docs);
				console.log("data : ", data.docs);
				setLoading(false);
			} catch (error) {
				console.log("Failed to fetch feeds : ", error);
			}
		};
		fetchData();
	}, []);
	// if (!data) return <p>Loading...</p>;
	return (
		<main className="grid flex-1 h-full sm:min-h-[100dvh] gap-4 overflow-auto grid-col-1 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 bg-secondary text-white px-4 pb-[8rem]">
			{data.map((element) => (
				<VideoItem key={element._id} {...element} />
			))}
			{data.map((element) => (
				<VideoItem key={element._id} {...element} />
			))}
		</main>
	);
};

export default FeedsPage;
