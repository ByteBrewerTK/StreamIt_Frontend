import { useEffect } from "react";
import ChatPageHeader from "../../components/chat/ChatPageHeader";
import { useOutletContext } from "react-router-dom";
import useFetchAllChats from "../../hooks/data/useFetchAllChats";
import Loader from "../../components/ui/loader/Loader";
import ChatItem from "../../components/chat/ChatItem";
const ChatPage = () => {
	const { setNavVisible } = useOutletContext();
	const { chatData, chatDataError, chatDataLoading } = useFetchAllChats();

	useEffect(() => {
		setNavVisible(false);
		return () => setNavVisible(true);
	}, [setNavVisible]);

	return (
		<main className="flex flex-col flex-1">
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
							<ChatItem {...chat} key={chat._id} />
						))}
					</div>
				)}
			</section>
		</main>
	);
};

export default ChatPage;
