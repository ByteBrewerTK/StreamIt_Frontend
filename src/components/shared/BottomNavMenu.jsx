import { useContext } from "react";
import { Link } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { MdOutlineSubscriptions } from "react-icons/md";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { BsPatchPlus } from "react-icons/bs";
import { UserContext } from "../../contexts/userContext";

const BottomNavMenu = ({ handleCreatePanelOpen, createPanelOpen }) => {
	const { userData } = useContext(UserContext);

	if (!userData) return;

	return (
		<main className="relative flex items-center w-full h-12 px-4 bg-primary z-[100] md:hidden">
			<div className="flex items-center justify-between w-full text-white ">
				<Link to={"/"} className="">
					<GoHome className="text-2xl " />
				</Link>
				<Link to={"/"} className="">
					<BiMessageRoundedDetail className="text-2xl" />
				</Link>
				<button
					onClick={() => {
						handleCreatePanelOpen(true);
					}}
				>
					<BsPatchPlus
						className={`text-2xl transition duration-500 ${
							createPanelOpen ? " rotate-[235deg]" : ""
						}`}
					/>
				</button>
				<Link to={"/user/subscriptions"} className="">
					<MdOutlineSubscriptions className="text-2xl" />
				</Link>
				<Link
					to={"/user/profile"}
					className="w-6 overflow-hidden rounded-full aspect-square"
				>
					<img src={userData.avatar} alt="" />
				</Link>
			</div>
		</main>
	);
};

export default BottomNavMenu;
