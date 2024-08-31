import { IoMdMore } from "react-icons/io";
import { Link } from "react-router-dom";
import { getTimeAgo } from "../../utils/getTimeAgo";
import { formatCounts } from "../../utils/formatCounts";
import formatVideoDuration from "../../utils/formatVideoDuration";

const VideoItem = ({ element, moreOptionsHandler }) => {
	return (
		<>
			<div className="relative flex flex-col w-full rounded-md shadow-lg h-fit">
				<Link
					to={`/watch?v=${element._id}`}
					className="relative w-full max-w-[360px] overflow-hidden rounded-lg aspect-video"
				>
					<img
						src={element.thumbnail}
						alt=""
						loading="lazy"
						className="object-cover object-center w-full "
					/>
					<span className="absolute px-1 text-white bg-black rounded-md bg-opacity-70 bottom-2 right-2">
						{formatVideoDuration(element.duration)}
					</span>
				</Link>
				<div className="flex items-center justify-between p-2 space-x-2 ">
					<div className="flex items-center space-x-2">
						<Link
							to={`/user/${element.username}`}
							className="w-8 overflow-hidden rounded-full aspect-square "
						>
							<img
								src={element.avatar}
								width={40}
								height={40}
								alt=""
								loading="lazy"
								className="object-cover object-center"
							/>
						</Link>
						<div className="flex-1 ">
							<Link
								to={`/watch?v=${element._id}`}
								className="mb-2 leading-5  font-[400] text-sm "
							>
								{element.title}
							</Link>
							<div className="text-[0.7rem] flex flex-row  text-gray-400  md:flex-col md:gap-0 gap-2">
								{element.channelName && (
									<Link
										to={`/user/${element.username}`}
										className="transition-all md:text-smr hover:text-gray-100"
									>
										{element.channelName}
									</Link>
								)}
								<div className="space-x-2">
									<span>{formatCounts(element.views)} </span>
									<span>{getTimeAgo(element.createdAt)}</span>
								</div>
							</div>
						</div>
					</div>
					<span
						className="z-10"
						onClick={() => {
							moreOptionsHandler(true, element._id);
						}}
					>
						<IoMdMore className="text-[1.5rem] text-white" />
					</span>
				</div>
			</div>
		</>
	);
};

export default VideoItem;
