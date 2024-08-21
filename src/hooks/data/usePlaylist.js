import { useState, useEffect } from "react";
import { apiRequest } from "../../services/api";

const usePlaylist = (userId) => {
	const [playlistData, setPlaylistData] = useState(null);
	const [playlistLoading, setLoading] = useState(true);
	const [playlistError, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await apiRequest(`/playlist/user/${userId}`);
				setPlaylistData(response);
			} catch (error) {
				setError(error);
				console.log(error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [userId]);

	return { playlistData, playlistLoading, playlistError };
};

export default usePlaylist;
