import { sideNavItems } from "../../data/navItems";
import SideNavItem from "../SideNavItem";

const SideNavbar = () => {
	return (
		<aside className="hidden w-[15rem] bg-primary h-full lg:block text-white px-4 ">
			<nav className="flex flex-col space-y-4">
				{sideNavItems.map((element, index) => (
					<SideNavItem key={index} {...element} />
					// <div>hello</div>
				))}
			</nav>
			
		</aside>
	);
};

export default SideNavbar;
