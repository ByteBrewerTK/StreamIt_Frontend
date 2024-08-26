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
		<div className="py-2 mx-auto w-container">
			{channelVideosData.map((video) => (
				<VideoItem key={video._id} {...video} />
			))}
		</div>
	);
};

export default ChannelVideos;
