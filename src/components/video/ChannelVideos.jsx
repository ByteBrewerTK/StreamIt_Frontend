import useChannelVideos from "../../hooks/data/useChannelVideos";
import Loader from "../ui/loader/Loader";
import VideoItem from "./VideoItem";

const ChannelVideos = (username) => {
	const { channelVideosData, channelVideosError, channelVideosLoading } =
		useChannelVideos(username);
	if (channelVideosLoading) {
		return (
			<div className="grid size-full place-items-center">
				<span className="size-[70px]">
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
	if (!channelVideosData || !channelVideosData?.length > 0) {
		return (
			<div className="grid size-full place-items-center text-muted">
				<span>No videos found</span>
			</div>
		);
	}

	return (
		<div className="grid flex-1 h-full sm:h-screen gap-4 py-2 overflow-y-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[280px] md:auto-rows-[320px] bg-secondary text-white scrollbar-hide md:pb-8">
			{channelVideosData.map((video) => (
				<VideoItem key={video._id} element={video} />
			))}
		</div>
	);
};

export default ChannelVideos;
