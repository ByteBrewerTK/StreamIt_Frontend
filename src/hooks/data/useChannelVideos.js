import { useEffect } from "react";
import { apiRequest } from "../../services/api";
import { useState } from "react";

const useChannelVideos = ({ username }) => {
	const [channelVideosData, setChannelVideosData] = useState(null);
	const [channelVideosError, setChannelVideosError] = useState(null);
	const [channelVideosLoading, setChannelVideosLoading] = useState(true);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await apiRequest(
					`/video/fetch-all-videos/${username}`
				);
				setChannelVideosData(response.data);
                console.log(response.data);
			} catch (error) {
				setChannelVideosError(error.message);
				console.log(error);
			} finally {
				setChannelVideosLoading(false);
			}
		};
		fetchData();
	}, [username]);
	return { channelVideosData, channelVideosError, channelVideosLoading };
};

export default useChannelVideos;
