import { useOutletContext } from "react-router-dom";
import Loader from "../components/ui/loader/Loader";
import VideoItem from "../components/video/VideoItem";
import useLikedVideos from "../hooks/data/useLikedVideos";
import { useEffect } from "react";

const LikedVideosPage = () => {
	const { setNavVisible } = useOutletContext();
	const { likedVideosData, likedVideosError, likedVideosLoading } =
		useLikedVideos();

	useEffect(() => {
		setNavVisible(true);

		return () => {
			setNavVisible(true);
		};
	});
	if (likedVideosLoading) {
		return (
			<div className="grid size-full place-items-center">
				<span className="size-[70px]">
					<Loader />
				</span>
			</div>
		);
	}
	if (likedVideosError) {
		return (
			<div className="grid size-full place-items-center text-muted">
				<span>{likedVideosError}</span>
			</div>
		);
	}
	if (likedVideosData && likedVideosData?.length === 0) {
		return (
			<div className="grid size-full place-items-center text-muted">
				<span>No videos found</span>
			</div>
		);
	}

	return (
		<div className="grid flex-1 h-full sm:h-screen gap-4 py-2 overflow-y-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[280px] md:auto-rows-[320px] bg-secondary text-white scrollbar-hide md:pb-8">
			{likedVideosData.map((video) => (
				<VideoItem key={video._id} element={video} />
			))}
		</div>
	);
};

export default LikedVideosPage;
