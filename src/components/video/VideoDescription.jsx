import { useState } from "react";

const VideoDescription = ({ description }) => {
	const descLength = description.length;
	description = description.slice(0, 20);

	const [isTruncate, setTruncate] = useState(descLength > 100);
	return (
		<div className="p-2 mb-4 overflow-hidden rounded-lg bg-primary text-muted_dark h">
			{description}
			{isTruncate && "..."}
		</div>
	);
};

export default VideoDescription;
