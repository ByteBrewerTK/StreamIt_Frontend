import { useEffect, useState } from "react";
import { apiRequest } from "../../services/api";

const useLikedVideos = () => {
	const [likedVideosData, setLikedVideosData] = useState(null);
	const [likedVideosError, setLikedVideosError] = useState(null);
	const [likedVideosLoading, setLikedVideosLoading] = useState(true);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await apiRequest(`/video/liked-videos`);
				setLikedVideosData(response.data);
			} catch (error) {
				setLikedVideosError(error.message);
				console.log(error);
			} finally {
				setLikedVideosLoading(false);
			}
		};
		fetchData();
	}, []);
	return { likedVideosData, likedVideosError, likedVideosLoading };
};

export default useLikedVideos;
