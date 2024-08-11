import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { apiRequest } from "../services/api";
import { useSearchParams, Link } from "react-router-dom";

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

	const { ownerDetails } = results;

	return (
		<div className="px-4 text-white">
			<section>
				<div className="w-[70rem] aspect-video rounded-lg overflow-hidden bg-black">
					<ReactPlayer
						url={results.videoFile}
						controls={true}
						style={videoPlayerStyle}
						width="100%"
						height="100%"
					/>
				</div>

				<div>
					<div>
						<h2>{results.title}</h2>
						<div>
							<div className="flex">
								<Link
									to={`/user/${ownerDetails._id}`}
									className="overflow-hidden w-[50px] aspect-square rounded-full"
								>
									{/* Avatar */}
									<img
										src={ownerDetails.avatar}
										alt={
											ownerDetails.fullName ||
											"Channel Avatar"
										}
										width={50}
										height={50}
										loading="lazy"
									/>
								</Link>
								<div>
									{/* Channel name and subscribers */}
									<Link to={`/user/${ownerDetails._id}`}>
										{ownerDetails.fullName}
									</Link>
									<p>
										{ownerDetails.subscribersCount}{" "}
										subscribers
									</p>
								</div>
								<div>
									{/* Subscribed button */}
									<button className="px-2 py-1 text-black bg-white rounded-full">
										{ownerDetails.isSubscribed
											? "Subscribed"
											: "Subscribe"}
									</button>
								</div>
							</div>
							<div>
								<div>{/* like button */}</div>
								<button>{/* share button */}</button>
								<button>{/* save */}</button>
							</div>
						</div>
					</div>
					<div></div>
				</div>
			</section>
			<div></div>
		</div>
	);
};

export default WatchVideo;
