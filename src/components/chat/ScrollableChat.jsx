import { useEffect } from "react";
import SingleMessage from "./SingleMessage";
import { useRef } from "react";

const ScrollableChat = ({ messages, newMessage, selectedChat }) => {
	const bottomRef = useRef();
	useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [newMessage, messages]);

	if (messages.length <= 0) {
		return (
			<section className="grid flex-1 place-items-center">
				<span className=" text-muted">No messages</span>
			</section>
		);
	}
	return (
		<section className="flex flex-col w-full h-full p-4 overflow-y-auto gap-y-2">
			{messages.map((message, index) => (
				<SingleMessage
					key={message._id}
					message={message}
					messages={messages}
					isGroupChat={selectedChat.isGroupChat}
					index={index}
				/>
			))}
			<div ref={bottomRef}></div>
		</section>
	);
};

export default ScrollableChat;
