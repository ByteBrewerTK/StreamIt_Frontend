import { sideNavItems } from "../../data/navItems";
import SideNavItem from "../SideNavItem";

const SideNavbar = ({isSidebarOpen}) => {
	return (
		<aside
			className={`bg-primary h-full text-white px-4 transition-all overflow-hidden text-nowrap hidden md:block ${isSidebarOpen ? "w-[15rem] translate-x-0" : "w-0  px-0 "} `}
		>
			<nav className="flex flex-col space-y-4">
				{sideNavItems.map((element, index) => (
					<SideNavItem key={index} {...element} />
				))}
			</nav>
		</aside>
	);
};

export default SideNavbar;
