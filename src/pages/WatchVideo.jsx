import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { apiRequest, toggleLikeApi } from "../services/api";
import { useSearchParams, Link } from "react-router-dom";
import { LuThumbsUp } from "react-icons/lu";
import { RiShareForwardLine } from "react-icons/ri";
import { IoBookmarkOutline } from "react-icons/io5";
import Comments from "../components/video/Comments";

const WatchVideo = () => {
	const [searchParams] = useSearchParams();
	const [results, setResults] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

	const videoId = searchParams.get("v");

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await apiRequest(`/video/${videoId}`);
				if (response.data) {
					setResults(response.data);
				} else {
					setError("No data found");
				}
			} catch (error) {
				setError("Error while fetching video");
				console.error("Error fetching video:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, [videoId]);

	
	const videoPlayerStyle = {
		width: "100%",
		height: "100%",
	};
	
	if (loading) return <p>Loading...</p>;
	if (error) return <p>{error}</p>;
	if (!results || !results.ownerDetails)
		return <p>No video details available</p>;
	
	const toggleLike = async ()=>{
		await toggleLikeApi("Video", videoId);
	}
	const { ownerDetails } = results;

	return (
		<div className="w-full text-white lg:px-4">
			<section>
				<div className=" lg:w-[70rem] aspect-video rounded-lg overflow-hidden bg-black">
					<ReactPlayer
						url={results.videoFile}
						controls={true}
						style={videoPlayerStyle}
						width="100%"
						height="100%"
					/>
				</div>

				<div className="px-2 space-y-2 border border-red-500 md:space-y-4">
					<h2 className="font-semibold md:text-mid">
						{results.title}
					</h2>
					<div className="flex flex-col items-center justify-between md:flex-row gap-y-4">
						<div className="flex items-center justify-between w-full md:space-x-4">
							<div className="flex items-center space-x-2">
								<Link
									to={`/user/${ownerDetails._id}`}
									className="overflow-hidden w-[35px] aspect-square rounded-full h-[35px] md:w-[45px] md:h-auto"
								>
									{/* Avatar */}
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
								<div className="flex items-center gap-2">
									{/* Channel name and subscribers */}
									<Link
										to={`/user/${ownerDetails._id}`}
										className="font-[500] text-sm"
									>
										{ownerDetails.fullName}
									</Link>
									<p className="inline-block text-smr text-muted_dark">
										{ownerDetails.subscribersCount}{" "}
										<span className="hidden md:inline-block">
											subscribers
										</span>
									</p>
								</div>
							</div>
							<div>
								{/* Subscribed button */}
								<button className="px-3 py-1 text-black bg-white rounded-full text-smr md:px-4">
									{ownerDetails.isSubscribed
										? "Subscribed"
										: "Subscribe"}
								</button>
							</div>
						</div>
						<div className="w-full overflow-x-auto overflow-y-hidden">
							<div className="flex items-center space-x-2">
								<button
									className="flex items-center px-6 py-1 space-x-2 text-sm border rounded-full border-muted"
									onClick={toggleLike}
								>
									{/* like button */}
									<LuThumbsUp className="text-sm " />
									<span>{results.likes}</span>
								</button>
								<button className="flex items-center px-4 py-1 space-x-2 text-sm border rounded-full border-muted">
									{/* share button */}
									<RiShareForwardLine className="text-sm " />
									<span>Share</span>
								</button>
								<button className="flex items-center px-4 py-1 space-x-2 text-sm border rounded-full border-muted">
									{/* save */}
									<IoBookmarkOutline className="text-sm " />
									<span>Save</span>
								</button>
							</div>
						</div>
					</div>
					<div>
						<div>
							<div className="flex space-x-2">
								<span>{results.views} views</span>
								<span></span>
							</div>

							<div>{results.description}</div>
						</div>
					</div>
					<Comments />
				</div>
			</section>
			<div></div>
		</div>
	);
};

export default WatchVideo;
