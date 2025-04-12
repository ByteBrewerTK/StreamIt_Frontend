import { IoMdMore } from "react-icons/io";
import { RiPlayList2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
const PlaylistItem = ({ playlist, playlistMoreOptionsHandler }) => {
	const { _id, name, videos } = playlist;

	let banner =
		"https://img.freepik.com/free-vector/geometric-background-vector-white-cube-patterns_53876-126683.jpg";
	if (videos.length > 0) {
		banner = videos[0].thumbnail;
	}
	return (
		<div className="relative flex flex-col w-[130px] mx-2 md:h-[145px] shadow-lg my-1 text-white before:w-[90%] before:h-[10%] before:bg-gray-500 before:absolute before:left-[50%] before:-translate-x-[50%] before:-top-1 before:rounded-full">
			<Link
				to={`/user/playlist?list=${_id}`}
				className="relative w-full overflow-hidden rounded-lg aspect-video"
			>
				{/* Banner */}
				<div className="w-full">
					<img
						src={banner}
						alt=""
						loading="lazy"
						className="object-cover object-center "
					/>
				</div>
				<span className="absolute bottom-0 right-0 flex items-center gap-1 px-1 mb-1 mr-1 bg-black rounded bg-opacity-55 text-smr">
					<RiPlayList2Fill />
					<span>{videos?.length}</span>
				</span>
			</Link>
			<div className="flex justify-between flex-1 py-2 ">
				{/* details */}
				<Link
					to={`/user/playlist?list=${_id}`}
					className="flex flex-col justify-between"
				>
					<h4 className="w-[100px] text-sm leading-4 truncate">
						{name}
					</h4>
				</Link>

				<button
					onClick={() => {
						playlistMoreOptionsHandler(true, _id);
					}}
				>
					<IoMdMore className="text-[1rem]" />
				</button>
			</div>
		</div>
	);
};

export default PlaylistItem;
