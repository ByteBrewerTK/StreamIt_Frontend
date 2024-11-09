import { useEffect } from "react";
import { useState } from "react";
import { apiRequest } from "../../services/api";

const useSubscriptionsVideos = () => {
	const [subsVideosData, setSubsVideosData] = useState({});
	const [subsVideosError, setSubsVideosError] = useState("");
	const [isSubsVideosLoading, setSubsVideosLoading] = useState(true);

	useEffect(() => {
		setSubsVideosError("");
		const fetchVideos = async () => {
			try {
				const response = await apiRequest("/subscriptions/videos");
				if (response) {
					setSubsVideosData(response?.data?.videos);
				}
			} catch (error) {
				setSubsVideosError("Error occurred");
				console.log(
					"Error occurred while fetching all subscriptions videos",
					error
				);
			} finally {
				setSubsVideosLoading(false);
			}
		};
		fetchVideos();
	}, []);
	return { subsVideosData, subsVideosError, isSubsVideosLoading };
};

export default useSubscriptionsVideos;
