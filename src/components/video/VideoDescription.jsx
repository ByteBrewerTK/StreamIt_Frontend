import { useState } from "react";

const VideoDescription = ({ description }) => {
	const [isTruncate, setTruncate] = useState(false);
	return (
		<div className="h-[5rem] rounded-lg bg-primary mb-4 text-muted_dark p-2 w-64 overflow-hidden text-ellipsis whitespace-nowrap border">
			{description}
		</div>
	);
};

export default VideoDescription;
