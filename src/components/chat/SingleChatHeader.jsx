import { Link } from "react-router-dom";
import { sliceTextAndTruncate } from "../../utils/sliceTextAndTruncate";
import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const SingleChatHeader = ({ receiver, isGroupChat }) => {
	const navigate = useNavigate();
	if (!receiver) return null;
	return (
		<header className="flex items-center w-full px-2 py-2 bg-primary gap-x-2">
			<button
				onClick={() => {
					navigate("/user/chat");
				}}
				
			>
				<MdArrowBack className="text-2xl text-white text-opacity-60" />
			</button>
			<div>
				{isGroupChat ? (
					<Link
						to={"/"}
						className="flex items-center text-white gap-x-2 w-fit"
					>
						<div className="size-[35px] overflow-hidden rounded-full object-cover object-center">
							<img src={receiver.groupAvatar} alt="" />
						</div>
						<h3 className="font-semibold">
							{sliceTextAndTruncate(receiver.chatName, 15)}
						</h3>
					</Link>
				) : (
					<Link
						to={"/"}
						className="flex items-center text-white gap-x-2 w-fit"
					>
						<div className="size-[35px] overflow-hidden rounded-full object-cover object-center">
							<img src={receiver.avatar} alt="" />
						</div>
						<h3 className="font-semibold">
							{sliceTextAndTruncate(receiver.fullName, 15)}
						</h3>
					</Link>
				)}
			</div>
		</header>
	);
};

export default SingleChatHeader;
