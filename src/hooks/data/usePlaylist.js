import { useState, useEffect } from "react";
import { apiRequest } from "../../services/api";

const usePlaylist = (userId) => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await apiRequest(`/playlist/user/${userId}`);
				setData(response);
			} catch (error) {
				setError(error);
				console.log(error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [userId]);

	return { data, loading, error };
};

export default usePlaylist;
