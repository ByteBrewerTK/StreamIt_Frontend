import { IoLogOutOutline } from "react-icons/io5";
import { MdOutlineManageAccounts } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { registerUserError } from "../../utils/customErrorMessage";
import { apiRequest } from "../../services/api";
import toast from "react-hot-toast";
import OptionsItem from "./OptionsItem";
import { LuSettings2 } from "react-icons/lu";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { FaRegBell } from "react-icons/fa";
import { FiLock } from "react-icons/fi";

const SettingsOptions = () => {
	const navigate = useNavigate();

	const logoutUser = () => {
		toast.promise(apiRequest("/user/logout", "POST"), {
			loading: "Signing out...",
			success: () => {
				localStorage.clear();
				navigate("/auth/login");
				return "Logged out successfully";
			},
			error: (error) => {
				const statusCode = error.response.status;

				return registerUserError(statusCode);
			},
		});
	};

	const options = [
		{
			title: "Account",
			icon: MdOutlineManageAccounts,
			path: "account",
		},
		{
			title: "General",
			icon: LuSettings2,
			path: "general",
		},
		{
			title: "Security",
			icon: FiLock,
			path: "security",
		},
		{
			title: "Notifications",
			icon: FaRegBell,
			path: "notifications",
		},
		{
			title: "About",
			icon: AiOutlineInfoCircle,
			path: "about",
		},
	];

	return (
		<>
			{options.map((option, index) => (
				<OptionsItem {...option} key={index} />
			))}
			<button
				onClick={logoutUser}
				className="flex items-center w-full px-4 py-2 mt-4 space-x-2 border-t border-gray-600 hover:bg-red-500 hover:bg-opacity-30 group border-opacity-55"
			>
				<IoLogOutOutline className="text-xl text-red-400 " />
				<span>Logout</span>
			</button>
		</>
	);
};

export default SettingsOptions;
