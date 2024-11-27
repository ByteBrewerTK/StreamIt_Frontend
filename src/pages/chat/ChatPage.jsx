import { useEffect } from "react";
import ChatHeader from "../../components/chat/ChatHeader";
import { useOutletContext } from "react-router-dom";
const ChatPage = () => {
	const { setNavVisible } = useOutletContext();

	useEffect(() => {
		setNavVisible(false);
		return () => setNavVisible(true);
	}, [setNavVisible]);
	return (
		<div>
			<ChatHeader />
		</div>
	);
};

export default ChatPage;
