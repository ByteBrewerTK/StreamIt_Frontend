import { useState } from "react";
import usePlaylist from "../hooks/data/usePlaylist";
import { getUserData } from "../services/authServices";
import Playlists from "../components/user/Playlists";
import PlaylistMorePanel from "../components/playlist/PlaylistMorePanel";
import Loader from "../components/ui/loader/Loader";
import PlaylistItem from "../components/ui/PlaylistItem";

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
	if (playlistLoading) {
		return (
			<div className="grid w-full h-full place-items-center">
				<span className="size-[4rem]">
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
		<div>
			{playlistData?.data?.length === 0 ? (
				<div className="grid w-full h-full place-content-center text-muted">
					No playlists found
				</div>
			) : (
				<div className="grid w-full grid-flow-col my-2 overflow-x-auto overflow-y-hidden auto-cols-max scrollbar-hide">
					{playlistData?.data.map((playlist) => (
						<div key={playlist._id}>
							<PlaylistItem
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