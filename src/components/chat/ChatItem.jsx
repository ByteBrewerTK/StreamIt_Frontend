import { useNavigate } from "react-router-dom";
import { ChatState } from "../../contexts/chatContext";
import { sliceTextAndTruncate } from "../../utils/sliceTextAndTruncate";
import useDeviceType from "../../hooks/useDeviceType";

// eslint-disable-next-line react/prop-types
const ChatItem = ({ chatItemData, setIsChatSelected }) => {
	const navigate = useNavigate();
	const deviceType = useDeviceType();
	const { _id, chatName, isGroupChat, latestMessage, users, groupAvatar } =
		chatItemData;
	const { user, setSelectedChat } = ChatState();
	if (!_id || !users.length > 0) {
		return null;
	}

	let individualChatWith = null;
	if (!isGroupChat) {
		[individualChatWith] = users.filter((singleUser) => {
			if (singleUser._id !== user._id) return singleUser;
		});
	}

	const clickHandler = () => {
		setSelectedChat(chatItemData);
		if (deviceType === "Desktop") {
			setIsChatSelected(true);
		} else {
			navigate(`messaging/${_id}`);
		}
	};
	return (
		<button
			onClick={clickHandler}
			className="flex items-center p-2 text-white rounded-lg bg-primary gap-x-2"
		>
			{!isGroupChat && individualChatWith ? (
				<>
					<div className="size-[50px] rounded-full overflow-hidden">
						<img src={individualChatWith.avatar} alt="" />
					</div>
					<div>
						<h3 className="text-lg font-semibold text-start">
							{sliceTextAndTruncate(
								individualChatWith.fullName,
								15
							)}
						</h3>

						<p className="text-sm text-muted text-start">
							{latestMessage ? (
								latestMessage.sender._id === user._id ? (
									<>
										<span className="semi-bold">You: </span>
										{sliceTextAndTruncate(
											latestMessage.content,
											25
										)}
									</>
								) : (
									sliceTextAndTruncate(
										latestMessage.content,
										25
									)
								)
							) : (
								"No messages"
							)}
						</p>
					</div>
				</>
			) : (
				<>
					<div className="size-[50px] rounded-full overflow-hidden">
						<img src={groupAvatar} alt="" />
					</div>
					<div>
						<h3 className="text-lg font-semibold">
							{sliceTextAndTruncate(chatName, 20)}
						</h3>
						{latestMessage ? (
							<div className="flex text-sm gap-x-1 text-muted">
								{latestMessage.sender._id === user._id ? (
									<span className="font-semibold">
										You :{" "}
									</span>
								) : (
									<span>
										@{latestMessage.sender.username}
									</span>
								)}
								<p>{latestMessage.content}</p>
							</div>
						) : (
							<p>No messages</p>
						)}
					</div>
				</>
			)}
		</button>
	);
};

export default ChatItem;
