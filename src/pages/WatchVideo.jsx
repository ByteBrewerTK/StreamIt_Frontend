import { useEffect, useState } from "react";
import {
	useSearchParams,
	Link,
	useOutletContext,
	useNavigate,
} from "react-router-dom";
import ReactPlayer from "react-player";
import { apiRequest, toggleLikeApi, toggleSubscription } from "../services/api";
import { RiShareForwardLine } from "react-icons/ri";
import { IoMdThumbsUp } from "react-icons/io";
import Comments from "../components/video/Comments";
import { getTimeAgo } from "../utils/getTimeAgo";
import { formatCounts } from "../utils/formatCounts";
import Loader from "../components/ui/loader/Loader";
import FetchError from "../components/ui/FetchError";
import { LiaComments } from "react-icons/lia";
import { IoBookmarkOutline } from "react-icons/io5";
import VideoDescription from "../components/video/VideoDescription";
import { FiThumbsUp } from "react-icons/fi";
import { getUserSetting } from "../services/authServices";

const WatchVideo = () => {
	const [searchParams] = useSearchParams();
	const videoId = searchParams.get("v");
	const [results, setResults] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);
	const [isLiked, setIsLiked] = useState(false);
	const [likes, setLikes] = useState(0);
	const [likeLoading, setLikeLoading] = useState(false);
	const [isCommentsOpen, setCommentOpen] = useState(false);
	const [initialComment, setInitialComment] = useState(null);
	const [isSubscribing, setSubscribing] = useState(false);
	const { setNavVisible } = useOutletContext();
	const navigate = useNavigate();
	const { autoPlayOnStart } = getUserSetting() || false;

	const commentQuery = {
		videoId,
		page: "1",
		limit: "10",
		sortBy: "createdAt",
		sortType: "asc",
	};

	const commentRequestUrl = `/comment/${commentQuery.videoId}?page=${commentQuery.page}&limit=${commentQuery.limit}&sortBy=${commentQuery.sortBy}&sortType=${commentQuery.sortType}`;

	useEffect(() => {
		setNavVisible(false);
		return () => setNavVisible(true);
	}, [setNavVisible]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [videoData, commentData] = await Promise.all([
					apiRequest(`/video/${videoId}`, "GET"),
					apiRequest(commentRequestUrl, "GET"),
				]);

				setIsLiked(videoData.data.isLiked);
				setLikes(videoData.data.likes);

				setResults({
					video: videoData,
					comments: commentData,
				});
			} catch (error) {
				setError("Error while fetching video and comments");
				console.error("Error fetching video and comments:", error);
				if (error.request.status === 500) {
					navigate("/");
				}
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [videoId, commentRequestUrl]);

	if (loading && !results?.video)
		return (
			<div className="grid w-full h-full place-items-center">
				{" "}
				<span className=" size-[70px]">
					<Loader />
				</span>
			</div>
		);
	if (error) return <FetchError error={error} />;
	if (!results || !results.video)
		return <FetchError error={"No videos found"} />;

	const { video, comments } = results;

	const { data } = video;
	const { ownerDetails } = data;

	const subscriptionToggle = async () => {
		const updatedOwnerDetails = await toggleSubscription(
			isSubscribing,
			setSubscribing,
			video?.data?.ownerDetails
		);
		video.data.ownerDetails = updatedOwnerDetails;
	};
	const toggleLike = async () => {
		if (likeLoading) return;
		try {
			setLikeLoading(true);
			const response = await toggleLikeApi("Video", videoId);
			if (response.statusCode === 200) {
				const isVideoLiked = Object.keys(response.data).length > 0;
				setIsLiked(isVideoLiked);
				setLikes((prev) => prev + (isVideoLiked ? 1 : -1));
			}
		} catch (error) {
			console.error("Error toggling like:", error);
		} finally {
			setLikeLoading(false);
		}
	};

	const handleInitialComment = (comment) => {
		setInitialComment(comment.content.substring(0, 40));
	};

	return (
		<div className="grid flex-1 w-full h-full overflow-hidden text-white lg:px-4 md:overflow-auto scrollbar-hide lg:grid-cols-[70%_1fr]">
			<section className="relative flex flex-col w-full">
				<div className="w-full overflow-hidden bg-black rounded-lg aspect-video">
					<ReactPlayer
						url={data.videoFile}
						playing={autoPlayOnStart}
						controls
						width="100%"
						height="100%"
					/>
				</div>
				<div className="relative flex-1 h-full px-2 py-2">
					<h2 className="font-semibold md:text-mid">{data.title}</h2>
					<div className="space-x-2 text-[0.6rem]">
						<span>{formatCounts(data.views)}</span>
						<span>{getTimeAgo(data.createdAt)}</span>
					</div>
					<div className="flex flex-col items-center justify-between my-4 md:flex-row gap-y-4">
						<div className="flex items-center justify-between w-full md:space-x-4 md:justify-normal md:w-fit">
							<div className="flex items-center space-x-2">
								<Link
									to={`/user/${ownerDetails.username}`}
									className="overflow-hidden w-[35px] aspect-square rounded-full h-[35px] md:w-[45px] md:h-auto"
								>
									<img
										src={ownerDetails.avatar}
										alt={
											ownerDetails.fullName ||
											"Channel Avatar"
										}
										width={45}
										height={45}
										loading="lazy"
									/>
								</Link>
								<div className="flex items-center gap-x-2 md:flex-col md:items-start">
									<Link
										to={`/user/${ownerDetails.username}`}
										className="font-[500] text-sm md:text-lg"
									>
										{ownerDetails.fullName}
									</Link>
									<p className="inline-block text-sm text-muted_dark md:text-xs md:text-nowrap">
										{ownerDetails.subscribersCount}{" "}
										<span className="hidden md:inline-block">
											subscribers
										</span>
									</p>
								</div>
							</div>
							<button
								className="text-sm rounded-full w-[6rem] h-[1.6rem] flex items-center justify-center"
								onClick={subscriptionToggle}
							>
								{isSubscribing ? (
									<div className="flex items-center justify-center w-full h-full border rounded-full">
										<span className="size-[20px]">
											<Loader />
										</span>
									</div>
								) : ownerDetails.isSubscribed ? (
									<span className="flex items-center h-full px-3 text-white border rounded-full md:px-4 ">
										{" "}
										Subscribed
									</span>
								) : (
									<span className="flex items-center h-full px-3 text-black bg-white border rounded-full md:px-4">
										{" "}
										Subscribe
									</span>
								)}
							</button>
						</div>
						<div className="w-full overflow-x-auto overflow-y-hidden md:w-fit">
							<div className="flex items-center space-x-2">
								<button
									className="flex items-center space-x-2 text-sm border rounded-full border-muted w-[80px] h-[32px] p-1"
									onClick={toggleLike}
								>
									<span className="w-[35%] border-r-2 border-gray-500 h-full flex items-center justify-center ">
										{likeLoading ? (
											<div className="w-[15px] h-[15px] ">
												<span className="size-[15px]">
													<Loader />
												</span>
											</div>
										) : !isLiked ? (
											<FiThumbsUp className="text-sm" />
										) : (
											<IoMdThumbsUp className="text-base text-white" />
										)}
									</span>
									<span className="flex-1">{likes}</span>
								</button>
								<button className="flex items-center px-4 py-1 space-x-2 text-sm border rounded-full border-muted">
									<RiShareForwardLine className="text-sm" />
									<span>Share</span>
								</button>
								<button className="flex items-center px-4 py-1 space-x-2 text-sm border rounded-full border-muted">
									<IoBookmarkOutline className="text-sm" />
									<span>Save</span>
								</button>
							</div>
						</div>
						<div
							className="flex w-full p-3 space-x-2 rounded-lg bg-primary text-muted text-nowrap md:hidden"
							onClick={() => {
								setCommentOpen(true);
							}}
						>
							<span className="">
								<LiaComments />
							</span>
							<span className="w-full text-smr">
								{initialComment ? (
									<p className="pr-2 truncate">
										{`${initialComment}...`}
									</p>
								) : (
									"No comments"
								)}
							</span>
						</div>
					</div>
					<VideoDescription description={data.description} />
					<section
						className={`absolute w-full h-full  bg-primary m-auto inset-0 flex flex-col transition duration-500 md:translate-y-0 md:relative md:inset-auto md:flex-col-reverse md:h-fit ${
							!isCommentsOpen ? "translate-y-[100%]" : ""
						}`}
					>
						<Comments
							comments={comments}
							setCommentOpen={setCommentOpen}
							handleInitialComment={handleInitialComment}
							videoId={videoId}
							setResults={setResults}
						/>
					</section>
				</div>
			</section>
		</div>
	);
};

export default WatchVideo;
