import VideoItem from "../components/video/VideoItem";
import Loader from "../components/ui/loader/Loader";
import useFeedVideos from "../hooks/data/useFeedVideos";
import { useState } from "react";
import MorePanel from "../components/video/MorePanel";
import { useRef } from "react";
import { useEffect } from "react";
import { apiRequest } from "../services/api";
import toast from "react-hot-toast";

const FeedsPage = () => {
	const [isMoreOptionsOpen, setMoreOptionsOpen] = useState(false);
	const [videoId, setVideoId] = useState(null);
	const [loading, setLoading] = useState(false);
	const [scrollLocation, setScrollLocation] = useState(0);
	const [pageData, setPageData] = useState({
		totalDocs: 14,
		limit: 10,
		page: 1,
		totalPages: 2,
		pagingCounter: 1,
		hasPrevPage: false,
		hasNextPage: true,
		prevPage: null,
		nextPage: 2,
	});
	const [query, setQuery] = useState({
		limit: 10,
		page: 1,
		sortBy: "duration",
		sortType: "asc",
	});
	const containerRef = useRef();

	const moreOptionsHandler = (state, videoId) => {
		setVideoId(videoId);
		setMoreOptionsOpen(state);
	};
	const url = `/video?limit=${query.limit}&page=${query.page}&sortBy=${query.sortBy}&sortType=${query.sortType}`;

	const { feedData, feedError, feedLoading } = useFeedVideos(url);

	const fetchOnScroll = async () => {
		if (loading) {
			return;
		}
		setLoading(true);
		try {
			const { data } = await apiRequest(url);
			console.log(data);
			// feedData.push(data)
		} catch (error) {
			toast.error("Something went wrong");
		} finally {
			setLoading(false);
		}
	};
	const scrollHandler = () => {
		const container = containerRef.current;
		console.log("scroll handler");
		const { scrollTop, scrollHeight, clientHeight } = container;
		if (
			scrollHeight - scrollTop <= clientHeight + 100 &&
			scrollLocation < scrollTop
		) {
			setScrollLocation(scrollTop);
			fetchOnScroll();
		}
	};

	useEffect(() => {
		const container = containerRef.current;

		if (container) {
			container.addEventListener("scroll", scrollHandler);
		}
		return () => {
			if (container) {
				container.removeEventListener("scroll", scrollHandler);
			}
		};
	}, [loading]);

	if (feedLoading)
		return (
			<main className="grid w-full h-full place-items-center">
				<div className="size-[70px]">
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
			<main
				ref={containerRef}
				className="grid flex-1 h-full sm:h-screen gap-4 py-2 overflow-y-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[280px] md:auto-rows-[320px] bg-secondary text-white scrollbar-hide md:pb-8"
			>
				{feedData &&
					feedData.map((element) => (
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
