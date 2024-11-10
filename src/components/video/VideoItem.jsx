import { IoMdMore } from "react-icons/io";
import { Link } from "react-router-dom";
import { getTimeAgo } from "../../utils/getTimeAgo";
import { formatCounts } from "../../utils/formatCounts";
import formatVideoDuration from "../../utils/formatVideoDuration";

const VideoItem = ({ element, moreOptionsHandler }) => {
	return (
		<div className="relative flex flex-col w-full max-w-[24rem] md:max-w-[22rem] rounded-md shadow-lg h-[280px] md:h-[320px]">
			<Link
				to={`/watch?v=${element._id}`}
				className="relative w-full overflow-hidden rounded-lg aspect-video"
			>
				<img
					src={element.thumbnail}
					alt={element.title}
					loading="lazy"
					className="object-cover w-full h-full"
				/>
				<span className="absolute px-1 text-xs font-semibold text-white bg-black rounded-md bg-opacity-70 bottom-2 right-2">
					{formatVideoDuration(element.duration)}
				</span>
			</Link>
			<div className="flex items-start justify-between p-2">
				<div className="flex items-center space-x-3">
					<Link
						to={`/user/@${element.username}`}
						className="w-8 h-8 overflow-hidden rounded-full"
					>
						<img
							src={element.avatar}
							width={40}
							height={40}
							alt={`${element.username}'s avatar`}
							loading="lazy"
							className="object-cover w-full h-full"
						/>
					</Link>
					<div className="flex flex-col flex-1 space-y-1">
						<Link
							to={`/watch?v=${element._id}`}
							className="text-sm font-medium leading-tight text-white line-clamp-2"
						>
							{element.title}
						</Link>
						<div className="text-xs text-gray-400">
							{element.channelName && (
								<Link
									to={`/user/${element.username}`}
									className="hover:text-gray-100"
								>
									{element.channelName}
								</Link>
							)}
							<div className="flex flex-wrap gap-x-2">
								<span>{formatCounts(element.views)}</span>
								<span>{getTimeAgo(element.createdAt)}</span>
							</div>
						</div>
					</div>
				</div>
				<span
					className="p-2 text-gray-400 cursor-pointer hover:text-white"
					onClick={() => moreOptionsHandler(true, element._id)}
				>
					<IoMdMore className="text-lg" />
				</span>
			</div>
		</div>
	);
};

export default VideoItem;
