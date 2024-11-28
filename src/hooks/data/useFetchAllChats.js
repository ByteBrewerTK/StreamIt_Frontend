import { useState } from "react";
import { useEffect } from "react";
import { apiRequest } from "../../services/api";

const useFetchAllChats = () => {
	const [chatData, setChatData] = useState(null);
	const [chatDataError, setChatDataError] = useState(null);
	const [chatDataLoading, setChatDataLoading] = useState(true);

	useEffect(() => {
		const fetchChats = async () => {
			try {
				const { data } = await apiRequest("/chat");
				setChatData(data);
			} catch (error) {
				console.log(error);
				setChatDataError(error);
			} finally {
				setChatDataLoading(false);
			}
		};
		fetchChats();
	}, []);

	return { chatData, chatDataLoading, chatDataError };
};

export default useFetchAllChats;
