import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const ChatItem = ({ _id, chatName, isGroupChat, latestMessage, users }) => {
    if (!chatName || !_id || !chatName || !latestMessage) {
        return null;
	}
    console.log(latestMessage.sender.username);
	return (
		<Link to={`messaging/${_id}`}>
			<div className="size-[50px] rounded-full overflow-hidden">
				<img src={users[0].avatar} alt="" />
			</div>
			<div>
				<h3>{isGroupChat ? chatName : users[0].fullName}</h3>
				{latestMessage ? (
					<div>
						{!isGroupChat && (
							<span>@{latestMessage.sender.username}</span>
						)}
					</div>
				) : (
					<p> No messages</p>
				)}
			</div>
		</Link>
	);
};

export default ChatItem;
