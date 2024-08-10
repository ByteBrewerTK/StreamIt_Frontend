import { useEffect } from "react";
import ReactPlayer from "react-player";
import { apiRequest } from "../services/api";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
const WatchVideo = () => {
	const [searchParams] = useSearchParams();
	const [results, setResults] = useState([]);

	const videoId = searchParams.get("v");

	useEffect(() => {
		const fetchData = async () => {
			const response = await apiRequest(`/video/${videoId}`);
			setResults(response.data);
			console.log("data : ", results);
		};
		fetchData();
	}, []);

	const videoPlayerStyle = {
		width: "100%",
		height: "100%",
	};
	return (
		<div>
			<div className="w-[900px] aspect-video rounded-lg overflow-hidden">
				<ReactPlayer
					url={results.videoFile}
					controls={true}
					style={videoPlayerStyle}
					width="100%"
					height="100%"
				/>
			</div>
		</div>
	);
};

export default WatchVideo;
