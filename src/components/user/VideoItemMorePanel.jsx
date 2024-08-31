import { useEffect } from "react";
import { useState } from "react";
import { GoBookmark } from "react-icons/go";
import { PiShareFat } from "react-icons/pi";
import PlaylistPanel from "../playlist/PlaylistPanel";

const VideoItemMorePanel = ({
	isMoreOptionsOpen,
	setMoreOptionsOpen,
	videoId,
}) => {
	const [openMorePanel, setMorePanel] = useState(null);

	useEffect(() => {
		if (isMoreOptionsOpen) {
			setMorePanel(null);
		}
	}, [isMoreOptionsOpen]);

	const toggleMorePanel = (state) => {
		setMorePanel(state);
	};
	return (
		<>
			{!openMorePanel ? (
				<div className="flex justify-around pb-4 mx-auto text-white w-container gap-x-8">
					<div
						onClick={() => {
							toggleMorePanel(1);
						}}
						className="flex flex-col items-center justify-center py-1 rounded-lg gap-x-4 bg-primary aspect-square w-[5rem]"
					>
						<GoBookmark className="text-3xl" />
						<span className="text-muted">Save</span>
					</div>
					<div
						onClick={() => {
							toggleMorePanel(2);
						}}
						className="flex flex-col items-center justify-center py-1 rounded-lg gap-x-4 bg-primary aspect-square w-[5rem]"
					>
						<PiShareFat className="text-3xl" />
						<span className="text-muted">Share</span>
					</div>
				</div>
			) : (
				openMorePanel === 1 && (
					<PlaylistPanel
						setMoreOptionsOpen={setMoreOptionsOpen}
						videoId={videoId}
					/>
				)
			)}
		</>
	);
};

export default VideoItemMorePanel;
