import { useState } from "react";
import { GoPlus } from "react-icons/go";
import usePlaylist from "../../hooks/data/usePlaylist";
import { getUserData } from "../../services/authServices";
import Loader from "../ui/loader/Loader";
import { apiRequest } from "../../services/api";
import toast from "react-hot-toast";
import CreatePlaylistModal from "./CreatePlaylistModal";
import PlaylistList from "./PlaylistList";

const PlaylistPanel = ({ setMoreOptionsOpen, videoId }) => {
	const [playlistPanelOpen, setPlaylistPanel] = useState(false);
	const [selectedOption, setSelectedOption] = useState(null);
	const [addVideoLoading, setAddVideoLoading] = useState(false);

	const { _id } = getUserData();
	const { playlistData, playlistLoading, playlistError } = usePlaylist(_id);

	const createPlaylistModalHandler = (state) => {
		setPlaylistPanel(state);
		if (!state) setMoreOptionsOpen(false);
	};

	const addToPlaylistHandler = async () => {
		if (!selectedOption || addVideoLoading) return;

		setAddVideoLoading(true);

		try {
			await apiRequest(`/playlist/${selectedOption}/${videoId}`, "PATCH");
			toast.success("Video added");
			createPlaylistModalHandler(false);
		} catch (error) {
			console.error(error);
			toast.error("Something went wrong!");
		} finally {
			setAddVideoLoading(false);
		}
	};

	if (!playlistData || playlistLoading || playlistError) {
		return (
			<div className="w-full h-[5rem] grid place-items-center">
				{playlistLoading ? (
					<span className="size-[30px]">
						<Loader />
					</span>
				) : (
					<span>{playlistError}</span>
				)}
			</div>
		);
	}

	return (
		<div className="flex flex-col max-h-[20rem]">
			{playlistPanelOpen && (
				<CreatePlaylistModal
					onClose={() => createPlaylistModalHandler(false)}
					videoId={videoId}
				/>
			)}
			<div className="flex items-center justify-between w-full h-12 p-2 bg-secondary">
				<span className="text-white">Save Video to...</span>
				<button
					onClick={() => createPlaylistModalHandler(true)}
					className="flex items-center text-blue-500"
				>
					<GoPlus className="text-2xl" /> <span>New Playlist</span>
				</button>
			</div>
			<PlaylistList
				playlistData={playlistData}
				selectedOption={selectedOption}
				setSelectedOption={setSelectedOption}
			/>
			{playlistData.data.length > 0 && (
				<button
					onClick={addToPlaylistHandler}
					disabled={!selectedOption || addVideoLoading}
					className="w-full h-14 text-white border-t font-[500] disabled:text-muted border-muted"
				>
					{!addVideoLoading ? (
						"Done"
					) : (
						<div className="grid w-full h-full place-items-center">
							<span className="size-[25px]">
								<Loader />
							</span>
						</div>
					)}
				</button>
			)}
		</div>
	);
};

export default PlaylistPanel;
