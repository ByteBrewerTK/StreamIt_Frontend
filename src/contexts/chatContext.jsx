import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { getUserData } from "../services/authServices";
import { useContext } from "react";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
	const [selectedChat, setSelectedChat] = useState(null);
	const [user, setUser] = useState(null);
	const [notification, setNotification] = useState([]);
	const [chat, setChat] = useState(null);

	useEffect(() => {
		const userInfo = getUserData();
		setUser(userInfo);
	}, []);

	return (
		<ChatContext.Provider
			value={{
				selectedChat,
				user,
				notification,
				chat,
				setSelectedChat,
				setUser,
				setNotification,
				setChat,
			}}
		>
			{children}
		</ChatContext.Provider>
	);
};
export const ChatState = () => {
	return useContext(ChatContext);
};

export default ChatProvider;
