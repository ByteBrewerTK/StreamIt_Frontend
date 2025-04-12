import { useState } from "react";
import usePlaylist from "../hooks/data/usePlaylist";
import { getUserData } from "../services/authServices";
import PlaylistMorePanel from "../components/playlist/PlaylistMorePanel";
import Loader from "../components/ui/loader/Loader";
import useNavVisible from "../hooks/useNavVisible";
import AllPlaylistItem from "../components/playlist/AllPlaylistItem";

const UserPlaylist = () => {
	const localUser = getUserData();
	const { playlistData, playlistLoading, playlistError } = usePlaylist(
		localUser._id
	);
	const [playlistId, setPlaylistId] = useState(null);
	const [isPlaylistMoreOptionsOpen, setPlaylistMoreOptionsOpen] =
		useState(false);
	const playlistMoreOptionsHandler = (state, playlistId) => {
		setPlaylistId(playlistId);
		setPlaylistMoreOptionsOpen(state);
	};
	useNavVisible(true);
	if (playlistLoading) {
		return (
			<div className="grid w-full h-full place-items-center">
				<span className="size-[70px]">
					<Loader />
				</span>
			</div>
		);
	}

	if (playlistError) {
		return <div>Error loading user data.</div>;
	}

	if (!playlistData) {
		return <div>No Playlist found</div>;
	}
	return (
		<div className="size-full h-[calc(100%-.5rem)]">
			{playlistData?.data?.length === 0 ? (
				<div className="grid w-full h-full place-content-center text-muted">
					No playlists found
				</div>
			) : (
				<div className="grid flex-1 h-full sm:h-[100vh] gap-x-4 overflow-x-hidden overflow-y-auto grid-col-1 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 bg-secondary text-white scrollbar-hide ">
					{playlistData?.data.map((playlist) => (
						<div key={playlist._id}>
							<AllPlaylistItem
								playlist={playlist}
								playlistMoreOptionsHandler={
									playlistMoreOptionsHandler
								}
							/>
						</div>
					))}
				</div>
			)}
			<PlaylistMorePanel
				isPlaylistMoreOptionsOpen={isPlaylistMoreOptionsOpen}
				setPlaylistMoreOptionsOpen={setPlaylistMoreOptionsOpen}
				playlistId={playlistId}
			/>
		</div>
	);
};

export default UserPlaylist;
