import { FaRegBell } from "react-icons/fa6";
import { RiBardLine } from "react-icons/ri";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { RxHamburgerMenu } from "react-icons/rx";
import logo from "../../assets/brand/StreamItLogo_Horizon_.png";
import { Link } from "react-router-dom";
const Navbar = ({ sidebarHandler }) => {
	return (
		<header className="flex items-center w-full bg-primary h-navbar">
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

				<div className="flex space-x-4">
					<span>
						<FaRegBell className="text-white text-[20px]" />
					</span>
					<span>
						<RiBardLine className="text-white text-[20px]" />
					</span>
					<span>
						<FaMagnifyingGlass className="text-white text-[20px]" />
					</span>
				</div>
			</div>
		</header>
	);
};

export default Navbar;
