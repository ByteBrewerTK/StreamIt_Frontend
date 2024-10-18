import { useEffect } from "react";
import { apiRequest } from "../../services/api";
import { useState } from "react";
const useGetUserAllVideos = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [data, setData] = useState(null);

	useEffect(() => {
		const fetchData = async (username) => {
			const response = await apiRequest(
				`/video/fetch-all-videos/${username}`
			);
			console.log(response);
		};
		fetchData();
	}, []);
};

export default useGetUserAllVideos;
