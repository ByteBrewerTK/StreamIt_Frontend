import { Link } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { MdOutlineSubscriptions } from "react-icons/md";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { BsPatchPlus } from "react-icons/bs";
import { getUserData } from "../../services/authServices";
import { useNavigate } from "react-router-dom";

const BottomNavMenu = ({ toggleCreatePanel, createPanelOpen }) => {
	const navigate = useNavigate();

	const user = getUserData();
	console.log(user)
	if (!user) return;
	console.log(user)

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
				<Link to={"/"} className="">
					<MdOutlineSubscriptions className="text-2xl" />
				</Link>
				<Link to={"/"} className="w-6 overflow-hidden rounded-full">
					<img src={user.avatar} alt="" />
				</Link>
			</div>
		</main>
	);
};

export default BottomNavMenu;