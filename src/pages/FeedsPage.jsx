import { useEffect, useRef } from "react";
import VideoItem from "../components/video/VideoItem";
import Loader from "../components/ui/loader/Loader";
import { useOutletContext } from "react-router-dom";
import useContainerScroll from "../hooks/useContainerScroll";
import useFeedVideos from "../hooks/data/useFeedVideos";

const FeedsPage = () => {
	const feedRef = useRef(null);
	const navbarVisible = useContainerScroll(feedRef);
	const { setNavVisible } = useOutletContext();

	console.log(navbarVisible);
	useEffect(() => {
		console.log(navbarVisible);
		setNavVisible(navbarVisible);

		return () => setNavVisible(false);
	}, [navbarVisible, setNavVisible]);

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
		<main
			ref={feedRef}
			className="grid flex-1 h-full sm:h-[100vh] gap-4 overflow-x-hidden overflow-y-auto grid-col-1 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 bg-secondary text-white px-4 scrollbar-hide"
		>
			{feedData && feedData?.map((element) => (
				<VideoItem key={element._id} {...element} />
			))}
		</main>
	);
};

export default FeedsPage;
