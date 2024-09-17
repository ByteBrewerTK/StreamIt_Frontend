import { useContext } from "react";
import { UserContext } from "../../contexts/userContext";
import { Link } from "react-router-dom";
import { IoLogOutOutline } from "react-icons/io5";
import toast from "react-hot-toast";
import { apiRequest } from "../../services/api";
import { registerUserError } from "../../utils/customErrorMessage";
import { useNavigate } from "react-router-dom";
import { GoGear } from "react-icons/go";

const ProfileOptionPanel = () => {
	const { userData } = useContext(UserContext);
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
	return (
		<div>
			<div className="flex items-center p-4 border-b border-gray-500 gap-x-2">
				<div className="size-[70px] rounded-full overflow-hidden">
					<img src={userData.avatar} alt="" />
				</div>

				<div className="flex flex-col">
					<span className="text-xl">{userData.fullName}</span>
					<span className="text-sm text-muted_dark">
						@{userData.username}
					</span>
					<Link
						to={`/user/@${userData.username}`}
						className="text-sm text-blue-500"
					>
						View your channel
					</Link>
				</div>
			</div>
			<div>
				<Link
					to={"/user/settings/desktop/account"}
					className="flex items-center px-4 py-2 space-x-2 hover:bg-white hover:bg-opacity-10 group"
				>
					<GoGear className="text-xl" />
					<span>Settings</span>
				</Link>
				<button
					onClick={() => {
						logoutUser();
					}}
					className="flex items-center w-full px-4 py-2 mt-4 space-x-2 border-gray-600 hover:bg-red-500 hover:bg-opacity-30 group border-opacity-55"
				>
					<IoLogOutOutline className="text-xl text-red-400 " />
					<span>Logout</span>
				</button>
			</div>
		</div>
	);
};

export default ProfileOptionPanel;
