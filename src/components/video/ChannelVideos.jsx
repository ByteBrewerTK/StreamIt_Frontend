import useChannelVideos from "../../hooks/data/useChannelVideos";
import Loader from "../ui/loader/Loader";
import VideoItem from "./VideoItem";

const ChannelVideos = (username) => {
	const { channelVideosData, channelVideosError, channelVideosLoading } =
		useChannelVideos(username);
	console.log(channelVideosData);

	if (channelVideosLoading) {
		return (
			<div className="grid size-full place-items-center">
				<span className="size-[40px]">
					<Loader />
				</span>
			</div>
		);
	}
	if (channelVideosError) {
		return (
			<div className="grid size-full place-items-center text-muted">
				<span>{channelVideosError}</span>
			</div>
		);
	}
	if (!channelVideosData && !channelVideosData?.allVideos.length > 0) {
		return (
			<div className="grid size-full place-items-center text-muted">
				<span>No videos found</span>
			</div>
		);
	}

	return (
		<div className="grid flex-1 h-full sm:h-[100vh] gap-x-4 overflow-x-hidden overflow-y-auto grid-col-1 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 bg-secondary text-white scrollbar-hide ">
			{channelVideosData.map((video) => (
				<VideoItem key={video._id} element={video} />
			))}
		</div>
	);
};

export default ChannelVideos;
