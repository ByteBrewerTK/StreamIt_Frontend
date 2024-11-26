import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { MdOutlineSubscriptions } from "react-icons/md";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { BsPatchPlus } from "react-icons/bs";
import { UserContext } from "../../contexts/userContext";

const BottomNavMenu = ({ handleCreatePanelOpen, createPanelOpen }) => {
	const { userData } = useContext(UserContext);
	const { pathname } = useLocation();
	if (!userData) return;

	return (
		<main className=" flex items-center w-full bg-primary z-[100] md:hidden">
			<div className="grid w-full h-full grid-cols-5 py-2 text-white min-h-max">
				<Link
					to={"/"}
					className={`relative after:bg-white after:size-[6px] after:rounded-full after:absolute after:left-[50%] after:-translate-x-[50%] after:top-[-.5rem] after:shadow-md after:shadow-white flex items-center justify-center flex-col ${
						pathname === "/" ? "after:block" : "after:hidden"
					}`}
				>
					<GoHome className="text-3xl text-muted " />
					<span className="text-[0.6rem] text-muted">Home</span>
				</Link>
				<Link
					to={"/user/chat"}
					className={`relative after:bg-white after:size-[6px] after:rounded-full after:absolute after:left-[50%] after:-translate-x-[50%] after:top-[-.5rem] after:shadow-md after:shadow-white flex items-center justify-center flex-col ${
						pathname.includes("user/chat")
							? "after:block"
							: "after:hidden"
					}`}
				>
					<BiMessageRoundedDetail className="text-3xl text-muted" />
					<span className="text-[0.6rem] text-muted">Message</span>
				</Link>
				<button
					onClick={() => {
						handleCreatePanelOpen(!createPanelOpen);
					}}
					className="flex flex-col items-center justify-center "
				>
					<BsPatchPlus
						className={`text-3xl text-muted transition duration-500 ${
							createPanelOpen ? " rotate-[235deg]" : ""
						}`}
					/>
				</button>
				<Link
					to={"/user/subscriptions"}
					className={`relative after:bg-white after:size-[6px] after:rounded-full after:absolute after:left-[50%] after:-translate-x-[50%] after:top-[-.5rem] after:shadow-md after:shadow-white flex items-center justify-center flex-col ${
						pathname.includes("user/subscriptions")
							? "after:block"
							: "after:hidden"
					}`}
				>
					<MdOutlineSubscriptions className="text-3xl text-muted" />
					<span className="text-[0.6rem] text-muted">
						Subscription
					</span>
				</Link>

				<Link
					to={"/user/profile"}
					className={`relative after:bg-white after:size-[6px] after:rounded-full after:absolute after:left-[50%] after:-translate-x-[50%] after:top-[-.5rem] after:shadow-md after:shadow-white flex items-center justify-center flex-col ${
						pathname.includes("user/profile")
							? "after:block"
							: "after:hidden"
					}`}
				>
					<div className="w-[1.875rem] overflow-hidden border-2 rounded-full aspect-square border-muted ">
						<img src={userData.avatar} alt="" />
					</div>
					<span className="text-[0.6rem] text-muted">Profile</span>
				</Link>
			</div>
		</main>
	);
};

export default BottomNavMenu;
