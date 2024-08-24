import React from "react";
("react-icons/md");
import { Link } from "react-router-dom";

const OptionsItem = ({ title, icon, path }) => {
	const Icon = icon;
	return (
		<Link
			to={path}
			className="flex items-center px-4 py-2 space-x-2 hover:bg-white hover:bg-opacity-10 group"
		>
			<Icon className="text-xl" />
			<span>{title}</span>
		</Link>
	);
};

export default OptionsItem;
