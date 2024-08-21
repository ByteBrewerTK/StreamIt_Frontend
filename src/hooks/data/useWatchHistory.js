import { useEffect, useState } from "react";
import { apiRequest } from "../../services/api";

const useWatchHistory = () => {
	const [watchHistoryData, setWatchHistoryData] = useState(null);
	const [watchHistoryError, setWatchHistoryError] = useState(null);
	const [watchHistoryLoading, setWatchHistoryLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
                const response = await apiRequest("/user/watch-history");
				setWatchHistoryData(response);
				console.log(response);
            } catch (error) {
                setWatchHistoryError(error)
                console.log(error)
            }finally{
                setWatchHistoryLoading(false)
            }
		};
		fetchData();
	}, []);

	return { watchHistoryData, watchHistoryError, watchHistoryLoading };
};

export default useWatchHistory;
