import { useEffect, useState } from "react";
import { apiRequest } from "../../../services/api";

const useFetchMessages = (chatId) => {
	const [messages, setMessages] = useState([]);
	const [isMessagesLoading, setMessagesLoading] = useState(true);
	const [messagesError, setMessagesError] = useState("");

	useEffect(() => {
		const fetchMessages = async () => {
			try {
				const { data } = await apiRequest(`/message/${chatId}`);
				setMessages(data);
			} catch (error) {
				console.error(error);
				setMessagesError(error.message);
			} finally {
				setMessagesLoading(false);
			}
		};
		fetchMessages();
	}, [chatId]);
	return { messages, messagesError, isMessagesLoading, setMessages };
};

export default useFetchMessages;
