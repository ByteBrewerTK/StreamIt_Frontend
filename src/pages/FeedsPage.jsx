import { useEffect, useRef } from "react";
import VideoItem from "../components/video/VideoItem";
import Loader from "../components/ui/loader/Loader";
import { useOutletContext } from "react-router-dom";
import useContainerScroll from "../hooks/useContainerScroll";
import useFeedVideos from "../hooks/data/useFeedVideos";
import { GoBookmark } from "react-icons/go";
import { PiShareFat } from "react-icons/pi";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import VideoItemMorePanel from "../components/user/VideoItemMorePanel";

const FeedsPage = () => {
	const feedRef = useRef(null);
	const moreOptionsRef = useRef(null);
	const navbarVisible = useContainerScroll(feedRef);
	const { setNavVisible } = useOutletContext();
	const [isMoreOptionsOpen, setMoreOptionsOpen] = useState(false);
	const [videoId, setVideoId] = useState(null);

	useEffect(() => {
		document.addEventListener("mousedown", outsideClick);

		return () => {
			document.removeEventListener("mousedown", outsideClick);
		};
	}, []);

	const outsideClick = (event) => {
		console.log(moreOptionsRef.current.contains(event.target));
		if (
			moreOptionsRef.current &&
			!moreOptionsRef.current.contains(event.target)
		) {
			setMoreOptionsOpen(false);
		}
	};
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
			<main
				ref={feedRef}
				className="grid flex-1 h-full sm:h-[100vh] gap-4 overflow-x-hidden overflow-y-auto grid-col-1 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 bg-secondary text-white scrollbar-hide"
			>
				{feedData &&
					feedData?.map((element) => (
						<VideoItem
							key={element._id}
							element={element}
							moreOptionsHandler={moreOptionsHandler}
						/>
					))}
			</main>
			<section
				className={`absolute flex w-full h-full overflow-hidden transition duration-200 ${
					!isMoreOptionsOpen ? "translate-y-full" : ""
				} `}
			>
				<section
					ref={moreOptionsRef}
					className="bg-secondary z-[100] flex flex-col self-end rounded-t-lg  w-container mx-auto pt-8 relative overflow-hidden "
				>
					<span
						onClick={() => {
							moreOptionsHandler(false);
						}}
						className="absolute top-0 right-0 p-1 text-black bg-white rounded-es-lg "
					>
						<IoMdClose />
					</span>
					<VideoItemMorePanel
						isMoreOptionsOpen={isMoreOptionsOpen}
						setMoreOptionsOpen={setMoreOptionsOpen}
						videoId={videoId}
					/>
				</section>
			</section>

			<section></section>
		</>
	);
};

export default FeedsPage;
