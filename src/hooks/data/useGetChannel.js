import { useEffect, useState } from "react";
import { apiRequest } from "../../services/api";

const useGetChannel = (username) => {
	const [channelError, setChannelError] = useState(null);
	const [channelData, setChannelData] = useState(null);
	const [channelDataLoading, setChannelDataLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await apiRequest(`/user/channel/${username}`);
				setChannelData(response.data)
			} catch (error) {
                setChannelError(error.message)
				console.log(error);
			} finally {
				setChannelDataLoading(false);
			}
		};
		fetchData();
	}, [username]);
	return { channelData, channelError, channelDataLoading };
};

export default useGetChannel;
