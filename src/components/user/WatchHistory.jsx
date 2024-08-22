import VideoItemWatchHistory from "../ui/VideoItemWatchHistory";


const WatchHistory = ({ data }) => {
	console.log(data);
	return (
		<div className="my-4 h-[190px] px-2">
			<div className="mx-2">
				<h3 className=" text-xl font-[500]">History</h3>
			</div>
			<div className="grid w-full grid-flow-col my-2 overflow-x-auto overflow-y-hidden auto-cols-max scrollbar-hide ">
				{data?.length === 0
					? "No watched video found"
					: data.map((video) => (
							<VideoItemWatchHistory key={video._id} {...video} />
					  ))}
			</div>
		</div>
	);
};

export default WatchHistory
