import { FaRegBell } from "react-icons/fa6";
import { RiBardLine } from "react-icons/ri";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { RxHamburgerMenu } from "react-icons/rx";
import logo from "../../assets/brand/StreamItLogo_Horizon_.png";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../contexts/userContext";
import Loader from "../ui/loader/Loader";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import ProfileOptionPanel from "../navbar/ProfileOptionPanel";
import { useLocation } from "react-router-dom";
import { LuUpload } from "react-icons/lu";
const Navbar = ({ sidebarHandler, handleCreatePanelOpen, createPanelOpen }) => {
	const { pathname } = useLocation();
	const { userData } = useContext(UserContext);
	const moreRef = useRef(null);
	const profileRef = useRef(null);
	const [isProfileOptionsOpen, setProfileOptionsOpen] = useState(false);

	useEffect(() => {
		setProfileOptionsOpen(false);
	}, [pathname]);

	useEffect(() => {
		const handleOutsideClick = (e) => {
			if (moreRef?.current && moreRef?.current.contains(e.target)) {
				return;
			} else if (
				profileRef?.current &&
				profileRef?.current.contains(e.target)
			) {
				return;
			}

			setProfileOptionsOpen(false);
		};
		window.addEventListener("mousedown", handleOutsideClick);

		return () => {
			window.removeEventListener("mousedown", handleOutsideClick);
		};
	}, []);
	const profileOptionHandler = (state = false) => {
		setProfileOptionsOpen(state);
	};
	if (!userData) {
		return (
			<div className="grid size-full place-items-center">
				<span className="size-[70px]">
					<Loader />
				</span>
			</div>
		);
	}
	return (
		<>
			<header className="relative flex items-center w-full bg-primary h-navbar">
				<div className="flex items-center justify-between mx-auto w-container md:w-[95%] z-10">
					<div className="flex items-center gap-x-2">
						<button
							onClick={() => sidebarHandler()}
							className="hidden md:block"
						>
							<RxHamburgerMenu className="text-2xl text-white" />
						</button>
						<Link to={"/"}>
							<img src={logo} alt="" width={120} height={30} />
						</Link>
					</div>

					<div className="flex items-center space-x-4">
						{!createPanelOpen && (
							<button
								onClick={handleCreatePanelOpen}
								className="items-center hidden px-3 py-1 text-black bg-white rounded-full gap-x-2 md:flex"
							>
								<LuUpload className="text-[20px]" />
								Upload
							</button>
						)}
						<span>
							<FaRegBell className="text-white text-[20px]" />
						</span>
						<span>
							<RiBardLine className="text-white text-[20px]" />
						</span>
						<span>
							<FaMagnifyingGlass className="text-white text-[20px]" />
						</span>
						<div className="relative">
							<button
								ref={profileRef}
								onClick={() => {
									profileOptionHandler(!isProfileOptionsOpen);
								}}
								className="hidden size-[40px] rounded-full overflow-hidden md:block relative"
							>
								<img
									src={userData.avatar}
									alt=""
									loading="lazy"
								/>
							</button>
							{isProfileOptionsOpen && (
								<section
									ref={moreRef}
									className="size-[18rem] fixed right-8 rounded-lg overflow-hidden bg-[#2f3937] text-white"
								>
									<ProfileOptionPanel />
								</section>
							)}
						</div>
					</div>
				</div>
			</header>
		</>
	);
};

export default Navbar;
