import { useEffect, useState } from "react";
import { PiShareFat } from "react-icons/pi";
import { IoTrashOutline } from "react-icons/io5";
import { apiRequest } from "../../services/api";
import toast from "react-hot-toast";
import Loader from "../ui/loader/Loader";
import { baseUrl } from "../../data/constants";

const PlaylistItemMorePanel = ({
	isPlaylistMoreOptionsOpen,
	setPlaylistMoreOptionsOpen,
	playlistId,
}) => {
	const [openMorePanel, setMorePanel] = useState(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (isPlaylistMoreOptionsOpen) {
			setMorePanel(null);
		}
	}, [isPlaylistMoreOptionsOpen]);

	const toggleMorePanel = (state) => {
		setMorePanel(state);
	};
	console.log(navigator.share)

	const shareHandler = async () => {
		const shareUrl = `${baseUrl}/playlist/${playlistId}`;
		if (navigator.share) {
			try {
				await navigator.share({
					title: "Playlist",
					url: shareUrl,
				});
			} catch (error) {
				toast.error("Error while share playlist");
				console.error("Error sharing", error);
			}
		} else {
			navigator.clipboard
				.writeText(shareUrl)
				.then(() => {
					toast.success("Link copied to clipboard!");
				})
				.catch((error) => {
					toast.error("Error while coping playlist url")
					console.error("Error copying url: ", error);
				});
		}
	};

	const deletePlaylistHandler = async () => {
		if (loading) return;
		setLoading(true);
		try {
			await apiRequest(`/playlist/${playlistId}`, "DELETE");
		} catch (error) {
			toast.error("Something went wrong");
			console.log(error);
		} finally {
			setPlaylistMoreOptionsOpen(false);
			setLoading(false);
		}
	};
	return (
		<>
			<div className="flex flex-col justify-around pb-4 mx-auto text-white w-container gap-y-2">
				<button
					onClick={shareHandler}
					className="flex items-center w-full h-12 px-2 rounded-lg gap-x-4 bg-primary"
				>
					<PiShareFat className="text-2xl" />
					<span className="text-muted">Share</span>
				</button>

				<div
					onClick={() => {
						deletePlaylistHandler();
					}}
					className="flex items-center w-full h-12 px-2 rounded-lg gap-x-4 bg-primary"
				>
					{loading ? (
						<span className="size-5">
							<Loader />
						</span>
					) : (
						<IoTrashOutline className="text-2xl text-red-500" />
					)}

					<span className="text-muted">Remove</span>
				</div>
			</div>
		</>
	);
};

export default PlaylistItemMorePanel;
