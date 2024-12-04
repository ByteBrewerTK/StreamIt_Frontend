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
	const navigate = useNavigate();
	useNavVisible();

	useEffect(() => {
		if(!userId){
			navigate(`/user/chat`, { replace: true });
		}
		const fetchChat = async () => {
			try {
				const { data } = await apiRequest("/chat", "POST", { userId });
				if (!data) {
					navigate(-1);
				}
				setSelectedChat(data);
				navigate(`/user/chat/messaging/${data._id}`, { replace: true });
			} catch (error) {
				console.error(error.message);
				navigate(`/user/chat`, { replace: true });
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
