import { useEffect } from "react";
import Loader from "../../components/ui/loader/Loader";
import { apiRequest } from "../../services/api";
import { useParams } from "react-router-dom";
import { ChatState } from "../../contexts/chatContext";
import { useNavigate } from "react-router-dom";
import useNavVisible from "../../hooks/useNavVisible";

const ChatAccess = () => {
	const { setSelectedChat } = ChatState();
	const { userId } = useParams();
	console.log(userId);
	const navigate = useNavigate();
	useNavVisible();

	useEffect(() => {
		const fetchChat = async () => {
			try {
				const { data } = await apiRequest("/chat", "POST", { userId });
				if (!data) {
					navigate(-1);
				}
				setSelectedChat(data);
				location.replace(`/user/chat/messaging/${data._id}`);
			} catch (error) {
				console.error(error.message);
				navigate(-1);
			}
		};
		fetchChat();
	}, []);
	return (
		<section className="grid flex-1 place-items-center">
			<span className="size-[70px]">
				<Loader />
			</span>
		</section>
	);
};

export default ChatAccess;
