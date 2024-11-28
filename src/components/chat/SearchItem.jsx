import { Link } from "react-router-dom";

const SearchItem = ({ avatar, fullName, username, _id }) => {
	if (!avatar || !fullName || !username) return null;
	return (
		<Link
			to={"access"}
			className="flex w-full p-2 text-white border-b border-muted gap-x-2"
		>
			<div className="size-[40px] rounded-full overflow-hidden border">
				<img src={avatar} alt="" />
			</div>
			<div className="flex-1 w-full">
				<h3>{fullName}</h3>
				<p className="truncate text-smr text-muted">@{username}</p>
			</div>
		</Link>
	);
};

export default SearchItem;
