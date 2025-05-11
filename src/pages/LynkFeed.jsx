import { useEffect, useState, useRef } from "react";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { apiRequest } from "../services/api";
import Loader from "../components/ui/loader/Loader";
import MorePanel from "../components/lynk/MorePanel";
import toast from "react-hot-toast";
import { useOutletContext } from "react-router-dom";

const LynkFeed = () => {
	const { setNavVisible } = useOutletContext();
	const [lynks, setLynks] = useState([]);
	const [lynkError, setLynkError] = useState("");
	const [lynkLoading, setLynkLoading] = useState(false);
	const [newLynk, setNewLynk] = useState("");
	const [creating, setCreating] = useState(false);
	const [isMoreOptionsOpen, setMoreOptionsOpen] = useState(false);
	const [lynkId, setLynkId] = useState(null);
	const [loading, setLoading] = useState(false);
	const [scrollLocation, setScrollLocation] = useState(0);
	const [pageData, setPageData] = useState({
		totalDocs: 0,
		limit: 10,
		page: 1,
		totalPages: 1,
		pagingCounter: 1,
		hasPrevPage: false,
		hasNextPage: false,
		prevPage: null,
		nextPage: null,
	});
	const [query, setQuery] = useState({
		limit: 10,
		page: 1,
		sortBy: "createdAt",
		sortType: "desc",
	});

	useEffect(() => {
		setNavVisible(true);

		return () => {
			setNavVisible(true);
		};
	});

	const containerRef = useRef();

	useEffect(() => {
		const fetchLynks = async () => {
			try {
				setLynkLoading(true);
				const url = `/lynks?limit=${query.limit}&page=${query.page}&sortBy=${query.sortBy}&sortType=${query.sortType}`;
				const res = await apiRequest(url);
				setLynks(res);
				setPageData(res.pagination || pageData);
				console.log(res);
			} catch (err) {
				setLynkError(err.message);
				console.error("Failed to fetch lynks", err);
				toast.error("Failed to load lynks");
			} finally {
				setLynkLoading(false);
			}
		};
		fetchLynks();
	}, [query]);

	const toggleLike = async (id) => {
		try {
			await apiRequest(`/lynks/${id}/like`, "PUT");
			setLynks((prev) =>
				prev.map((lynk) =>
					lynk._id === id
						? {
								...lynk,
								likes: lynk.likes.includes("me")
									? lynk.likes.filter((uid) => uid !== "me")
									: [...lynk.likes, "me"],
						  }
						: lynk
				)
			);
		} catch (err) {
			console.error("Failed to like lynk", err);
			toast.error("Failed to like lynk");
		}
	};

	const createLynk = async () => {
		if (!newLynk.trim()) return;
		try {
			setCreating(true);
			const res = await apiRequest("/lynks", "POST", {
				content: newLynk,
			});
			setLynks([res.data, ...lynks]);
			setNewLynk("");
			toast.success("Lynk posted successfully!");
		} catch (err) {
			console.error("Failed to create lynk", err);
			toast.error("Failed to post lynk");
		} finally {
			setCreating(false);
		}
	};

	const moreOptionsHandler = (state, id) => {
		setLynkId(id);
		setMoreOptionsOpen(state);
	};

	const fetchMoreLynks = async () => {
		if (loading || !pageData.hasNextPage) {
			return;
		}

		setLoading(true);
		try {
			const nextPage = query.page + 1;
			const url = `/lynks?limit=${query.limit}&page=${nextPage}&sortBy=${query.sortBy}&sortType=${query.sortType}`;
			const res = await apiRequest(url);
			setLynks((prev) => [...prev, ...res.data]);
			setPageData(res.pagination || pageData);
			setQuery((prev) => ({ ...prev, page: nextPage }));
		} catch (error) {
			console.error("Failed to fetch more lynks", error);
			toast.error("Failed to load more lynks");
		} finally {
			setLoading(false);
		}
	};

	const scrollHandler = () => {
		const container = containerRef.current;
		const { scrollTop, scrollHeight, clientHeight } = container;

		if (
			scrollHeight - scrollTop <= clientHeight + 100 &&
			scrollLocation < scrollTop &&
			pageData.hasNextPage
		) {
			setScrollLocation(scrollTop);
			fetchMoreLynks();
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
	}, [loading, pageData.hasNextPage]);
	console.log(lynks);

	if (lynkLoading)
		return (
			<main className="grid w-full h-full place-items-center">
				<div className="size-[70px]">
					<Loader />
				</div>
			</main>
		);

	return (
		<>
			<main
				ref={containerRef}
				className="flex flex-col w-full h-screen max-w-xl py-6 mx-auto overflow-y-auto scrollbar-hide"
			>
				<div className="p-4 mb-6 bg-[#1a1a1a] border border-gray-700 rounded-2xl">
					<textarea
						value={newLynk}
						onChange={(e) => setNewLynk(e.target.value)}
						placeholder="What's on your mind?"
						className="w-full p-3 text-white bg-transparent border rounded-xl border-gray-600 focus:outline-none focus:ring focus:ring-blue-500 resize-none min-h-[80px]"
					/>
					<div className="flex justify-end mt-2">
						<button
							onClick={createLynk}
							disabled={creating || !newLynk.trim()}
							className="px-4 py-2 text-sm font-semibold text-white transition bg-blue-600 rounded-lg disabled:opacity-50 hover:bg-blue-700"
						>
							{creating ? "Posting..." : "Lynk"}
						</button>
					</div>
				</div>

				{!lynks || lynks.length === 0 ? (
					<div className="text-xl text-center select-none text-muted">
						{lynkError ? lynkError : "No lynks found"}
					</div>
				) : (
					<div className="space-y-4">
						{lynks.map((lynk) => (
							<div
								key={lynk._id}
								className="p-4 bg-[#1a1a1a] rounded-2xl shadow-md border border-gray-700"
							>
								<div className="flex items-start gap-3">
									<img
										src={
											lynk.author?.avatar ||
											"/default-avatar.png"
										}
										alt={lynk.author?.username}
										className="olynks || lynks.length === 0bject-cover w-10 h-10 rounded-full"
									/>
									<div className="flex-1">
										<div className="flex items-center justify-between">
											<h2 className="text-sm font-semibold text-white">
												@{lynk.author?.username}
											</h2>
											<div className="flex items-center gap-2">
												<span className="text-xs text-gray-400">
													{new Date(
														lynk.createdAt
													).toLocaleString()}
												</span>
												<button
													onClick={() =>
														moreOptionsHandler(
															true,
															lynk._id
														)
													}
													className="text-gray-400 hover:text-white"
												>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														className="w-5 h-5"
														viewBox="0 0 20 20"
														fill="currentColor"
													>
														<path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
													</svg>
												</button>
											</div>
										</div>
										<p className="mt-1 text-sm text-white whitespace-pre-wrap">
											{lynk.content}
										</p>
										{lynk.media &&
											lynk.media.length > 0 && (
												<div className="grid grid-cols-2 gap-2 mt-2">
													{lynk.media.map(
														(m, idx) => (
															<img
																key={idx}
																src={m.url}
																alt="media"
																className="object-cover rounded-lg max-h-48"
															/>
														)
													)}
												</div>
											)}
										<div className="flex items-center gap-3 mt-3">
											<button
												onClick={() =>
													toggleLike(lynk._id)
												}
												className="flex items-center gap-1 text-sm text-white transition hover:text-red-500"
											>
												{lynk.likes.includes("me") ? (
													<IoMdHeart className="text-red-500" />
												) : (
													<IoMdHeartEmpty />
												)}
												{lynk.likes.length}
											</button>
										</div>
									</div>
								</div>
							</div>
						))}

						{loading && (
							<div className="flex justify-center py-4">
								<div className="size-[40px]">
									<Loader />
								</div>
							</div>
						)}
					</div>
				)}
			</main>

			<MorePanel
				setMoreOptionsOpen={setMoreOptionsOpen}
				isMoreOptionsOpen={isMoreOptionsOpen}
				lynkId={lynkId}
			/>
		</>
	);
};

export default LynkFeed;
