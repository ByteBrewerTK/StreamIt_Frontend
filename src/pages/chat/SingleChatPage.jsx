import { useEffect } from "react";
import { ChatState } from "../../contexts/chatContext";
import { useOutletContext } from "react-router-dom";
import SingleChatHeader from "../../components/chat/SingleChatHeader";
import { useRef } from "react";
import useFetchMessages from "../../hooks/data/chat/useFetchMessages";
import { useParams } from "react-router-dom";
import SingleMessage from "../../components/chat/SingleMessage";
import { AiOutlineSend } from "react-icons/ai";
import Loader from "../../components/ui/loader/Loader";
import { useState } from "react";
import { apiRequest } from "../../services/api";
import useNavVisible from "../../hooks/useNavVisible";
import ScrollableChat from "../../components/chat/ScrollableChat";
import { io } from "socket.io-client";

const SingleChatPage = () => {
	useNavVisible(false);
	const { chatId } = useParams();
	const [isLoading, setLoading] = useState(true);
	const { selectedChat, setSelectedChat, user, notification } = ChatState();
	const { setBottomMenuOpen } = useOutletContext();
	const { messages, messagesError, isMessagesLoading } =
		useFetchMessages(chatId);
	const [isMessageSending, setMessageSending] = useState(false);
	const [messageContent, setMessageContent] = useState("");
	const [newMessage, setNewMessage] = useState({});
	const formRef = useRef();

	// let socket;

	useEffect(() => {
		let socket = io(import.meta.env.VITE_SOCKET_ENDPOINT);
		console.log(socket)
	}, []);

	useEffect(() => {
		const fetchChat = async () => {
			try {
				const { data } = await apiRequest("/chat", "POST", { chatId });
				setSelectedChat(data);
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		};
		if (!selectedChat && isLoading && chatId) {
			fetchChat();
		}
		setLoading(false);
	}, [chatId]);
	useEffect(() => {
		setBottomMenuOpen(false);
		return () => {
			setBottomMenuOpen(true); // Reset bottom menu state
		};
	}, []); // Effect will run whenever `setNavVisible` changes

	const inputChangeHandler = (event) => {
		setMessageContent(event.target.value);
		return;
	};

	if (!selectedChat || isLoading) {
		return (
			<main className="grid flex-1 place-items-center">
				<span className="size-[70px]">
					<Loader />
				</span>
			</main>
		);
	}

	const receiverData = () => {
		if (!selectedChat.isGroupChat) {
			return selectedChat.users.filter((chatUser) => {
				if (chatUser._id !== user._id) return chatUser;
			})[0];
		}
		return selectedChat;
	};

	const submitHandler = async (event) => {
		event.preventDefault();
		formRef.current.reset();
		let updatedMessageContent = messageContent.trim();
		if (
			!chatId ||
			!updatedMessageContent ||
			!(updatedMessageContent.length < 50)
		) {
			return;
		}

		setMessageSending(true);
		try {
			const { data } = await apiRequest("/message", "POST", {
				chatId,
				content: messageContent,
			});
			setNewMessage({ data });
			messages.push(data);
			setMessageContent("");
		} catch (error) {
			console.error(error);
		} finally {
			setMessageSending(false);
		}
	};

	const chatHeaderData = {
		receiver: receiverData(),
		isGroupChat: selectedChat.isGroupChat,
	};
	return (
		<main className="flex flex-col flex-1 overflow-hidden">
			<SingleChatHeader {...chatHeaderData} />

			{isMessagesLoading ? (
				<section className="grid flex-1 place-items-center">
					<span className="size-[70px]">
						<Loader />
					</span>
				</section>
			) : (
				<ScrollableChat
					messages={messages}
					newMessage={newMessage}
					selectedChat={selectedChat}
				/>
			)}
			<form
				ref={formRef}
				onSubmit={submitHandler}
				className="flex items-center justify-between w-full px-2 py-2 gap-x-2 bg-primary  md:py-0 md:h-[4rem] sticky bottom-0"
			>
				<input
					type="text"
					placeholder="Write a message"
					onChange={inputChangeHandler}
					maxLength={50}
					className="w-full h-10 px-2 text-sm text-white rounded outline-none bg-secondary outline-1 focus:outline-muted_border placeholder:text-smr"
				/>
				<button className="flex items-center justify-center h-full text-center bg-white rounded-full disabled:opacity-60 aspect-square md:h-[40px]">
					{!isMessageSending ? (
						<AiOutlineSend className="text-xl text-black" />
					) : (
						<span className="h-[20px] w-[20px] flex">
							<Loader color={"black"} />
						</span>
					)}
				</button>
			</form>
		</main>
	);
};

export default SingleChatPage;
