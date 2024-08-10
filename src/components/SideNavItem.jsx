import { Link } from "react-router-dom";

const SideNavItem = (element) => {
	const Icon = element.icon;
	return (
		<Link
			to={element.path}
			className="flex items-center px-2 py-2 space-x-2 rounded-lg hover:bg-secondary"
		>
			<div>
				<Icon className="text-[20px] text-white" />
			</div>
			<span>{element.name}</span>
		</Link>
	);
};

export default SideNavItem;
