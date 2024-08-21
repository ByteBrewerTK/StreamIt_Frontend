import { Link } from "react-router-dom";
import formatVideoDuration from "../../utils/formatVideoDuration";
import { IoMdMore } from "react-icons/io";

const VideoItemWatchHistory = ({ _id, thumbnail, owner, title, duration }) => {
	return (
		<Link
			to={`/watch?v=${_id}`}
			className="flex flex-col w-[130px] mx-2 h-[145px] shadow-lg my-1"
		>
			<div className="relative w-full overflow-hidden rounded-lg aspect-video">
				{/* Thumbnail */}
				<img
					src={thumbnail}
					alt=""
					loading="lazy"
					className="object-cover object-center "
				/>
				<span className="absolute bottom-0 right-0 px-1 mb-1 mr-1 bg-black rounded bg-opacity-55 text-smr">
					{formatVideoDuration(duration)}
				</span>
			</div>
			<div className="flex justify-between flex-1 py-2 ">
				{/* details */}
				<div className="flex flex-col justify-between">
					<p className="text-sm leading-4">{title.slice(0, 26)}...</p>
					<span className="text-[0.6rem] text-muted">
						{owner.fullName}
					</span>
				</div>

				<span>
					<IoMdMore className="text-[1rem]" />
				</span>
			</div>
		</Link>
	);
};

export default VideoItemWatchHistory;
