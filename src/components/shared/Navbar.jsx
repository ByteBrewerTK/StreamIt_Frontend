import { FaRegBell } from "react-icons/fa6";
import { RiBardLine } from "react-icons/ri";
import { FaMagnifyingGlass } from "react-icons/fa6";
import logo from "../../assets/brand/StreamItLogo_Horizon_.png";
const Navbar = () => {
	return (
		<header className="flex items-center w-full bg-primary h-navbar">
			<div className="flex items-center justify-between mx-auto w-container md:w-[95%] z-10">
				<div>
					<img src={logo} alt="" width={120} height={30} />
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
