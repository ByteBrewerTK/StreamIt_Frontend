import { useEffect } from "react";
import { apiRequest } from "../services/api";
import { useState } from "react";
import VideoItem from "../components/video/VideoItem";
import Loader from "../components/ui/loader/Loader";
import { useOutletContext } from "react-router-dom";
import { useRef } from "react";
import useContainerScroll from "../hooks/useContainerScroll";

const FeedsPage = () => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const feedRef = useRef(null);
	const navbarVisible = useContainerScroll(feedRef);
	const { setNavVisible } = useOutletContext();

	console.log(navbarVisible)
	useEffect(() => {
		setNavVisible(navbarVisible);
	}, [navbarVisible]);

	const query = {
		limit: 10,
		page: 1,
		sortBy: "duration",
		sortType: "asc",
	};
	const url = `/video?limit=${query.limit}&page=${query.page}&sortBy=${query.sortBy}&sortType=${query.sortType}`;

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const { data } = await apiRequest(url);

				setData(data.docs);
			} catch (error) {
				console.log("Failed to fetch feeds : ", error);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, []);

	// const lastScrollY = useScroll();
	// console.log(lastScrollY);

	if (loading)
		return (
			<main className="grid w-full h-full place-items-center">
				<div className="size-[60px]">
					<Loader />
				</div>
			</main>
		);
	if (!data.length > 0)
		return (
			<main className="grid w-full h-full place-items-center">
				<div className="text-xl select-none text-muted">
					No videos found
				</div>
			</main>
		);
	return (
		<main
			ref={feedRef}
			className="grid flex-1 h-full sm:h-[100vh] gap-4 overflow-x-hidden overflow-y-auto grid-col-1 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 bg-secondary text-white px-4 scrollbar-hide"
		>
			{data.map((element) => (
				<VideoItem key={element._id} {...element} />
			))}
		</main>
	);
};

export default FeedsPage;
