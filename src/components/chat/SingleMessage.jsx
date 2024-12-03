import { ChatState } from "../../contexts/chatContext";
import {
	checkContinuosSender,
	checkSameDayMessage,
	messageDateFormat,
	messageTimeFormat,
} from "../../utils/chatUtils";

const SingleMessage = ({ message, index, messages, isGroupChat }) => {
	const { user } = ChatState();

	if (!message || !user) return null;

	const { sender, content, createdAt } = message;
	return (
		<>
			{!checkSameDayMessage(messages, index) && (
				<div className="flex justify-center w-full">
					<p className="px-2 text-sm text-center bg-white rounded-lg select-none text-muted bg-opacity-10 w-fit">
						{messageDateFormat(createdAt)}
					</p>
				</div>
			)}
			<div
				className={`flex text-white gap-x-2 items-center w-full ${
					sender._id === user._id ? "self-end flex-row-reverse" : ""
				}`}
			>
				{checkContinuosSender(messages, index) && isGroupChat && (
					<div className="size-[25px] rounded-full overflow-auto relative">
						<img src={sender?.avatar} alt="" />
					</div>
				)}
				<div
					className={`flex items-center max-w-full px-2 overflow-hidden text-black  rounded-lg gap-x-1 min-h-[1.6rem] ${
						sender._id === user._id
							? "bg-white"
							: "bg-[#92FE9D] text-black"
					}`}
				>
					<div className="w-[calc(100%-2.8rem)]">
						<p className="break-words text-smr text-wrap">
							{content}
						</p>
					</div>
					<span className="text-[.6rem] self-end whitespace-nowrap w-[2.8rem] text-end select-none">
						{messageTimeFormat(createdAt)}
					</span>
				</div>
			</div>
		</>
	);
};

export default SingleMessage;
