import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import usePlaylist from "../hooks/data/usePlaylist";
import useUserData from "../hooks/data/useUserData";
import useWatchHistory from "../hooks/data/useWatchHistory";
import { getUserData } from "../services/authServices";
import Loader from "../components/ui/loader/Loader";
import VideoItemWatchHistory from "../components/ui/VideoItemWatchHistory";

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
		<main className="w-full h-full pt-6 text-white">
			<div>
				<section className="mx-auto w-container">
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

				<section className="w-full">
					{/* Watch history */}
					<div className="my-4 h-[200px] px-2">
						<div className="mx-2">
							<h3 className=" text-xl font-[500]">History</h3>
						</div>
						<div className="grid w-full grid-flow-col my-4 overflow-x-auto overflow-y-hidden auto-cols-max scrollbar-hide ">
							{watchHistoryData?.data?.length === 0
								? "No watched video found"
								: watchHistoryData.data.map((video) => (
										<VideoItemWatchHistory
											key={video._id}
											{...video}
										/>
								  ))}
						</div>
					</div>

					{/* Playlists */}
					<div className="my-4 h-[200px] border">
						<div className="mx-2">
							<h3>Playlists</h3>
						</div>
						<div className="grid w-full grid-flow-col my-4 overflow-x-auto overflow-y-hidden auto-cols-max scrollbar-hide">
							{playlistData?.data?.length === 0
								? "No playlist found"
								: playlistData.data.map((playlist) => (
										<div key={playlist._id}>
											{playlist.name}
										</div>
								  ))}
						</div>
					</div>
				</section>
			</div>
		</main>
	);
};

export default UserProfilePage;
