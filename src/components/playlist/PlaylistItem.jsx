import { IoMdClose, IoMdMore } from "react-icons/io";
import { Link } from "react-router-dom";
import formatVideoDuration from "../../utils/formatVideoDuration";
import { formatCounts } from "../../utils/formatCounts";
import { getTimeAgo } from "../../utils/getTimeAgo";

const PlaylistItem = ({ _id, thumbnail, title, owner, views, duration, createdAt }) => {
	return (
		<div className="grid w-full grid-cols-2 lg:flex lg:flex-row gap-x-4">
			<Link to={`/watch?v=${_id}`}>
				<div className="relative overflow-hidden rounded-lg lg:max-w-[300px] aspect-video">
					<img
						src={thumbnail}
						alt=""
						loading="lazy"
						className="object-cover object-center"
					/>
					<span className="absolute px-1 bg-black bg-opacity-50 rounded-lg bottom-2 right-2">
						{formatVideoDuration(duration)}
					</span>
				</div>
			</Link>
			<div className="flex-1">
				<div className="flex justify-between w-full lg:text-2xl">
					<h3 className=" text-wrap text-smr md:text-xl">{title}</h3>
					<div>
						<button className="hidden md:inline">
							<IoMdClose />
						</button>
						<button>
							<IoMdMore />
						</button>
					</div>
				</div>
				<div className="flex gap-x-2 text-muted_dark text-[.76rem] flex-col md:flex-row leading-none">
					<Link to={`/user/@${owner.username}`}>
						{owner.fullName}
					</Link>
					<span className="hidden md:inline">&bull;</span>
					<span>{formatCounts(views)}</span>
					<span>{getTimeAgo(createdAt)}</span>
				</div>
			</div>
		</div>
	);
};

export default PlaylistItem;
