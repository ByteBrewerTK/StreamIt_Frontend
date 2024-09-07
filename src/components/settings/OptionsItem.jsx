("react-icons/md");
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const OptionsItem = ({ title, icon, path }) => {
	const { pathname } = useLocation();
	const currentPath = pathname.split("/").at(-1);
	console.log(path, currentPath);

	const Icon = icon;
	return (
		<Link
			to={path}
			className={`flex items-center px-4 py-2 space-x-2 hover:bg-white hover:bg-opacity-10 group ${
				currentPath === path ? " bg-white bg-opacity-10" : ""
			}`}
		>
			<Icon className="text-xl" />
			<span>{title}</span>
		</Link>
	);
};

export default OptionsItem;
