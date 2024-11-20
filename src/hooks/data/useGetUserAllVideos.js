import { useEffect } from "react";
import { apiRequest } from "../../services/api";
import { useState } from "react";
const useGetUserAllVideos = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [data, setData] = useState(null);

	useEffect(() => {
		const fetchData = async (username) => {
			try {
				const response = await apiRequest(
					`/video/fetch-all-videos/${username}`
				);
				setData(response.data);
			} catch (error) {
				console.error("Error while fetch user all videos :", error);
				setError(error.message);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, []);
	return { loading, error, data };
};

export default useGetUserAllVideos;
