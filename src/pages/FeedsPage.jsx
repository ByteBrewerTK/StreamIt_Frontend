import VideoItem from "../components/video/VideoItem";
import Loader from "../components/ui/loader/Loader";
import useFeedVideos from "../hooks/data/useFeedVideos";
import { useState } from "react";
import MorePanel from "../components/video/MorePanel";

const FeedsPage = () => {
	const [isMoreOptionsOpen, setMoreOptionsOpen] = useState(false);
	const [videoId, setVideoId] = useState(null);

	const moreOptionsHandler = (state, videoId) => {
		setVideoId(videoId);
		setMoreOptionsOpen(state);
	};
	const query = {
		limit: 10,
		page: 1,
		sortBy: "duration",
		sortType: "asc",
	};
	const url = `/video?limit=${query.limit}&page=${query.page}&sortBy=${query.sortBy}&sortType=${query.sortType}`;

	const { feedData, feedError, feedLoading } = useFeedVideos(url);

	if (feedLoading)
		return (
			<main className="grid w-full h-full place-items-center">
				<div className="size-[60px]">
					<Loader />
				</div>
			</main>
		);
	if (!feedData && !feedData?.length > 0)
		return (
			<main className="grid w-full h-full place-items-center">
				<div className="text-xl select-none text-muted">
					{feedError ? feedError : "No videos found"}
				</div>
			</main>
		);
	return (
		<>
			<main className="grid flex-1 h-full sm:h-[100vh] gap-x-4 overflow-x-hidden overflow-y-auto grid-col-1 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 bg-secondary text-white scrollbar-hide ">
				{feedData &&
					feedData?.map((element) => (
						<VideoItem
							key={element._id}
							element={element}
							moreOptionsHandler={moreOptionsHandler}
						/>
					))}
			</main>
			<MorePanel
				setMoreOptionsOpen={setMoreOptionsOpen}
				isMoreOptionsOpen={isMoreOptionsOpen}
				videoId={videoId}
			/>
		</>
	);
};

export default FeedsPage;
