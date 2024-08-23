import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import usePlaylist from "../hooks/data/usePlaylist";
import useUserData from "../hooks/data/useUserData";
import useWatchHistory from "../hooks/data/useWatchHistory";
import { getUserData } from "../services/authServices";
import Loader from "../components/ui/loader/Loader";
import WatchHistory from "../components/user/WatchHistory";
import Playlists from "../components/user/Playlists";
import ProfileNav from "../components/user/ProfileNav";

const UserProfilePage = () => {
	const { setNavVisible } = useOutletContext();

	// Fetch user data, playlist, and watch history
	const { userData, userDataLoading, userDataError } = useUserData();
	const localUser = getUserData();
	const { playlistData, playlistLoading, playlistError } = usePlaylist(
		localUser._id
	);
	const { watchHistoryData, watchHistoryError, watchHistoryLoading } =
		useWatchHistory();

	useEffect(() => {
		setNavVisible(false);
		// Cleanup if needed
		return () => setNavVisible(true);
	}, [setNavVisible]);

	// Loading and Error handling
	if (userDataLoading || playlistLoading || watchHistoryLoading) {
		return (
			<div className="grid w-full h-full place-items-center">
				<span className="size-[4rem]">
					<Loader />
				</span>
			</div>
		);
	}

	if (userDataError || playlistError || watchHistoryError) {
		return <div>Error loading user data.</div>;
	}

	if (!userData) {
		return <div>No Data found</div>;
	}

	return (
		<main className="w-full h-full overflow-hidden text-white">
			<div className="border-b-2 border-gray-800 shadow-sm bg-primary">
				<ProfileNav />
				<section className="py-4 mx-auto w-container ">
					{/* Profile details */}
					<div className="flex items-center gap-x-2">
						<div className="overflow-hidden rounded-full size-[70px]">
							<img
								src={userData.avatar}
								alt="Profile Avatar"
								loading="lazy"
							/>
						</div>
						<div className="flex flex-col flex-1 leading-5 h-fit">
							<h2 className="text-[1.4rem]">
								{userData.fullName}
							</h2>
							<div className="flex space-x-3 text-smr">
								<span>@{userData.username}</span>
								<span className="text-muted">View Channel</span>
							</div>
						</div>
					</div>
				</section>
			</div>
			<section className="w-full overflow-y-auto scrollbar-hide">
				{/* Watch history */}
				<WatchHistory {...watchHistoryData} />

				{/* Playlists */}
				<Playlists {...playlistData} />
			</section>
		</main>
	);
};

export default UserProfilePage;
