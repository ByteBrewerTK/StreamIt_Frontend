import { useEffect } from "react";
import ChatPageHeader from "../../components/chat/ChatPageHeader";
import { useOutletContext } from "react-router-dom";
import useFetchAllChats from "../../hooks/data/useFetchAllChats";
import Loader from "../../components/ui/loader/Loader";
import ChatItem from "../../components/chat/ChatItem";
import useDeviceType from "../../hooks/useDeviceType";
import Chat_Illustration from "../../assets/chat_illus.svg";
import { useState } from "react";
import SingleChatPage from "./SingleChatPage";
import { ChatState } from "../../contexts/chatContext";
const ChatPage = () => {
	const { setNavVisible } = useOutletContext();
	const { chatData, chatDataError, chatDataLoading } = useFetchAllChats();
	const [isChatSelected, setIsChatSelected] = useState(false);
	const { selectedChat, setSelectedChat } = ChatState();
	const deviceType = useDeviceType();
	console.log(selectedChat);

	useEffect(() => {
		setNavVisible(deviceType === "Desktop");
		return () => setNavVisible(true);
	}, [setNavVisible, deviceType]);

	return (
		<main className="flex flex-1">
			<div className="flex flex-col flex-1 md:border-r-2 md:border-muted max-w-[425px]">
				<ChatPageHeader />
				<section className="flex-1 overflow-hidden">
					{chatDataLoading ? (
						<div className="grid size-full place-items-center">
							<span className="size-[70px]">
								<Loader />
							</span>
						</div>
					) : chatDataError ? (
						<div className="grid size-full place-items-center">
							<p className="text-muted">{chatDataError}</p>
						</div>
					) : (
						<div className="flex flex-col px-1 py-2 overflow-x-hidden overflow-y-auto size-full gap-y-1">
							{chatData.map((chat) => (
								<ChatItem
									chatItemData={chat}
									setIsChatSelected={setIsChatSelected}
									key={chat._id}
								/>
							))}
						</div>
					)}
				</section>
			</div>
			{deviceType === "Desktop" && (
				<div className="grid flex-1 place-items-center">
					{!selectedChat ? (
						<img src={Chat_Illustration} alt="" />
					) : (
						<SingleChatPage chatIdProp={selectedChat._id} />
					)}
				</div>
			)}
		</main>
	);
};

export default ChatPage;
