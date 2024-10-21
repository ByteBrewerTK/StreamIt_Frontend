import { FaPlay } from "react-icons/fa6";
import { GoPencil, GoPlus } from "react-icons/go";
import { IoMdMore } from "react-icons/io";
import { RiShareForwardLine } from "react-icons/ri";
import Loader from "../components/ui/loader/Loader";
import { useSearchParams } from "react-router-dom";
import useGetPlaylistById from "../hooks/data/useGetPlaylistById";
import { Link } from "react-router-dom";

const PlaylistPage = () => {
	const [searchParams] = useSearchParams();
	const playlistId = searchParams.get("list");
	const { playlistData, playlistLoading, playlistError } =
		useGetPlaylistById(playlistId);

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
		return <div>Error loading playlist.</div>;
	}

	if (!playlistData) {
		return <div>No Playlist found</div>;
	}
	const playlist = playlistData.data;
	const playlistVideos = playlist.videos;
	const playlistVideosCount = playlist.videos.length;
	console.log(playlist);

	return (
		<div className="grid flex-1 grid-cols-[25rem,1fr] text-white">
			<section className="pt-10 size-full">
				<div className="p-8 rounded-t-3xl bg-primary size-full">
					<div>
						<div className="w-full mb-6 overflow-hidden rounded-lg aspect-video">
							<img
								src={playlistVideos[0].thumbnail}
								alt=""
								loading="lazy"
								className="object-cover object-center"
							/>
						</div>
						<div>
							<h2 className="text-[2rem] font-bold mb-2">
								{playlist.name}
							</h2>
							<div>
								<Link className="flex items-center mb-2 gap-x-2">
									<div className="size-[24px] rounded-full overflow-hidden">
										<img
											src={playlist.owner.avatar}
											alt=""
										/>
									</div>
									<span>
										{`by ${playlist.owner.fullName}`}
									</span>
								</Link>
								<div className="flex items-center mb-4 text-sm gap-x-2 text-muted_dark">
									<span>{playlist.privacyType}</span>
									&bull;
									<span>{`${playlistVideosCount}${
										playlistVideosCount > 1
											? " videos"
											: " video"
									}`}</span>
								</div>
							</div>
							<div className="flex justify-between w-full h-10">
								<button className="flex items-center h-full px-6 text-black bg-white rounded-full gap-x-2">
									<FaPlay />
									Play All
								</button>
								<button className="flex items-center justify-center h-full text-xl bg-white bg-opacity-25 rounded-full aspect-square">
									<GoPlus />
								</button>
								<button className="flex items-center justify-center h-full text-xl bg-white bg-opacity-25 rounded-full aspect-square">
									<GoPencil />
								</button>
								<button className="flex items-center justify-center h-full text-xl bg-white bg-opacity-25 rounded-full aspect-square">
									<RiShareForwardLine />
								</button>
								<button className="flex items-center justify-center h-full text-xl bg-white bg-opacity-25 rounded-full aspect-square">
									<IoMdMore />
								</button>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section></section>
		</div>
	);
};

export default PlaylistPage;
