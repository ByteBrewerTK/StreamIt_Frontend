import { Link } from "react-router-dom";
import VideoItemWatchHistory from "../ui/VideoItemWatchHistory";

const WatchHistory = ({ data, moreOptionsHandler }) => {
	return (
		<div className="my-4 h-[190px] px-2">
			<div className="flex items-center justify-between mx-2">
				<h3 className=" text-xl font-[500]">History</h3>
				<Link to={"/user/history"} className="text-blue-500 text-smr">View all</Link>
			</div>

			{data?.length === 0 ? (
				<div className="grid w-full h-full place-content-center text-muted">
					No playlists found
				</div>
			) : (
				<div className="grid w-full grid-flow-col my-2 overflow-x-auto overflow-y-hidden auto-cols-max scrollbar-hide">
					{data.map((video) => (
						<VideoItemWatchHistory
							key={video._id}
							video={video}
							moreOptionsHandler={moreOptionsHandler}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default WatchHistory;
