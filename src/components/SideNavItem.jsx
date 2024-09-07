import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const SideNavItem = (element) => {
	const { pathname } = useLocation();
	const Icon = element.icon;
	const ActiveIcon = element.activeIcon;
	return (
		<Link
			to={element.path}
			className={`flex items-center px-2 py-2 space-x-2 rounded-lg hover:bg-secondary ${element.path === pathname ? "bg-secondary" : ""}`}
		>
			<div>
				{element.path === pathname ? (
					<ActiveIcon className="text-[20px] text-white" />
				) : (
					<Icon className="text-[20px] text-white" />
				)}
			</div>
			<span>{element.name}</span>
		</Link>
	);
};

export default SideNavItem;
