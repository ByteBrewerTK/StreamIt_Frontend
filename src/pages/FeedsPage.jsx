import { useEffect } from "react";
import { apiRequest } from "../services/api";
import { useState } from "react";

const FeedsPage = () => {
	const [data, setData] = useState({});
	const query = {
		limit: 10,
		page: 3,
		sortBy: "duration",
		sortType: "asc",
	};
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await apiRequest(
					`/video?limit=${query.limit}&page=${query.page}&sortBy=${query.sortBy}&sortType=${query.sortType}`
				);

				// setData(response.data);
				console.log(response);
			} catch (error) {
				console.log("Failed to fetch feeds : ", error);
			}
		};
		fetchData();
	}, []);
	if (!data) return <p>Loading...</p>;
	return <main>This is homepage</main>;
};

export default FeedsPage;
