import { useState, useEffect } from "react";
import { apiRequest } from "../../services/api";

const useFeedVideos = (url) => {
	const [feedData, setFeedData] = useState(null);
	const [feedLoading, setFeedLoading] = useState(true);
	const [feedError, setFeedError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const { data } = await apiRequest(url);

				setFeedData(data.docs);
			} catch (error) {
				setFeedError(error);
				console.log("Failed to fetch feeds : ", error);
			} finally {
				setFeedLoading(false);
			}
		};
		fetchData();
	}, [feedData,url]);

	return { feedData, feedLoading, feedError };
};

export default useFeedVideos;
