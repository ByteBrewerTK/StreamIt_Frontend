import { useState, useEffect } from "react";
import { apiRequest } from "../../services/api";

const useGetPlaylistById = (playlistId) => {
	const [playlistData, setPlaylistData] = useState(null);
	const [playlistLoading, setLoading] = useState(true);
	const [playlistError, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await apiRequest(`/playlist/${playlistId}`);
				setPlaylistData(response);
			} catch (error) {
				setError(error);
				console.log(error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [playlistId]);

	return { playlistData, playlistLoading, playlistError };
};

export default useGetPlaylistById;
