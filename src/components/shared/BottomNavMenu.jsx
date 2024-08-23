import { Link } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { MdOutlineSubscriptions } from "react-icons/md";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { BsPatchPlus } from "react-icons/bs";
import { getUserData } from "../../services/authServices";

const BottomNavMenu = ({ toggleCreatePanel, createPanelOpen }) => {

	const user = getUserData();

	if (!user) return;

	return (
		<main className="relative flex items-center w-full h-12 px-4 bg-primary z-[100]">
			<div className="flex items-center justify-between w-full text-white ">
				<Link to={"/"} className="">
					<GoHome className="text-2xl " />
				</Link>
				<Link to={"/"} className="">
					<BiMessageRoundedDetail className="text-2xl" />
				</Link>
				<button onClick={toggleCreatePanel}>
					<BsPatchPlus
						className={`text-2xl transition duration-500 ${
							createPanelOpen ? " rotate-[235deg]" : ""
						}`}
					/>
				</button>
				<Link to={"/user/subscriptions"} className="">
					<MdOutlineSubscriptions className="text-2xl" />
				</Link>
				<Link to={"/user/profile"} className="w-6 overflow-hidden rounded-full">
					<img src={user.avatar} alt="" />
				</Link>
			</div>
		</main>
	);
};

export default BottomNavMenu;
