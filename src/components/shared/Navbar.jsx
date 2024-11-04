import { FaRegBell, FaMagnifyingGlass } from "react-icons/fa6";
import { RiBardLine } from "react-icons/ri";
import { RxHamburgerMenu } from "react-icons/rx";
import { LuUpload } from "react-icons/lu";
import logo from "../../assets/brand/StreamItLogo_Horizon_.png";
import { Link, useLocation } from "react-router-dom";
import { useContext, useState, useRef, useEffect, useCallback } from "react";
import { UserContext } from "../../contexts/userContext";
import ProfileOptionPanel from "../navbar/ProfileOptionPanel";
import useUserData from "../../hooks/data/useUserData";
import { getUserData, saveUserData } from "../../services/authServices";
const defaultAvatar = "../../assets/default_avatar.jpg";

const Navbar = ({ sidebarHandler, handleCreatePanelOpen, createPanelOpen }) => {
	const { setUserData } = useContext(UserContext);
	const { pathname } = useLocation();
	const moreRef = useRef(null);
	const profileRef = useRef(null);
	const [isProfileOptionsOpen, setProfileOptionsOpen] = useState(false);
	const { userData } = useUserData();

	// Save user data if available
	useEffect(() => {
		if (userData) {
			saveUserData(userData);
			setUserData(userData);
		}
	}, [userData]);

	// Close profile options on route change
	useEffect(() => {
		setProfileOptionsOpen(false);
	}, [pathname]);

	// Handle outside click for closing profile options
	useEffect(() => {
		const handleOutsideClick = (e) => {
			if (
				moreRef.current?.contains(e.target) ||
				profileRef.current?.contains(e.target)
			) {
				return;
			}
			setProfileOptionsOpen(false);
		};
		window.addEventListener("mousedown", handleOutsideClick);
		return () =>
			window.removeEventListener("mousedown", handleOutsideClick);
	}, []);

	const profileOptionHandler = useCallback((state = false) => {
		setProfileOptionsOpen(state);
	}, []);
	const user = getUserData();

	return (
		<header className="relative flex items-center w-full bg-primary h-navbar">
			<div className="flex items-center justify-between mx-auto w-container md:w-[95%] z-10">
				{/* Left Side: Logo and Sidebar Toggle */}
				<div className="flex items-center gap-x-2">
					<button
						onClick={sidebarHandler}
						className="hidden md:block"
					>
						<RxHamburgerMenu className="text-2xl text-white" />
					</button>
					<Link to={"/"}>
						<img
							src={logo}
							alt="StreamIt Logo"
							width={120}
							height={30}
						/>
					</Link>
				</div>

				{/* Right Side: Icons and Profile */}
				<div className="flex items-center space-x-4">
					{!createPanelOpen && (
						<button
							onClick={() => handleCreatePanelOpen(true)}
							className="items-center hidden px-3 py-1 text-black bg-white rounded-full gap-x-2 md:flex"
						>
							<LuUpload className="text-[20px]" />
							Upload
						</button>
					)}
					<FaRegBell className="text-white text-[20px]" />
					<RiBardLine className="text-white text-[20px]" />
					<FaMagnifyingGlass className="text-white text-[20px]" />

					{/* Profile Button and Options Panel */}
					<div className="relative">
						<button
							ref={profileRef}
							onClick={() =>
								profileOptionHandler(!isProfileOptionsOpen)
							}
							className="hidden size-[40px] rounded-full overflow-hidden md:block relative"
						>
							<img
								src={user?.avatar || defaultAvatar}
								alt="User Avatar"
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
	);
};

export default Navbar;
