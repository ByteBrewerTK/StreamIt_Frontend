import { useEffect, useState } from "react";
import { GoBookmark } from "react-icons/go";
import { PiShareFat } from "react-icons/pi";
import PlaylistPanel from "../playlist/PlaylistPanel";
import { IoTrashOutline } from "react-icons/io5";
import { apiRequest } from "../../services/api";
import toast from "react-hot-toast";

const VideoItemMorePanel = ({
	isMoreOptionsOpen,
	setMoreOptionsOpen,
	videoId,
	removeVideoButton,
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

	const removeFromHistoryHandler = async () => {
		try {
			await apiRequest(`/user/watch-history/remove/${videoId}`, "DELETE");
		} catch (error) {
			toast.error("Something went wrong");
			console.log(error);
		} finally {
			setMoreOptionsOpen(false);
		}
	};
	return (
		<>
			{!openMorePanel ? (
				<div className="flex flex-col justify-around pb-4 mx-auto text-white w-container gap-y-2">
					<div
						onClick={() => {
							toggleMorePanel(1);
						}}
						className="flex items-center w-full h-12 px-2 rounded-lg gap-x-4 bg-primary"
					>
						<GoBookmark className="text-2xl" />
						<span className="text-muted">Save</span>
					</div>
					<div
						onClick={() => {
							toggleMorePanel(2);
						}}
						className="flex items-center w-full h-12 px-2 rounded-lg gap-x-4 bg-primary"
					>
						<PiShareFat className="text-2xl" />
						<span className="text-muted">Share</span>
					</div>

					{removeVideoButton && (
						<div
							onClick={() => {
								removeFromHistoryHandler();
							}}
							className="flex items-center w-full h-12 px-2 rounded-lg gap-x-4 bg-primary"
						>
							<IoTrashOutline className="text-2xl text-red-500" />
							<span className="text-muted">Remove</span>
						</div>
					)}
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
