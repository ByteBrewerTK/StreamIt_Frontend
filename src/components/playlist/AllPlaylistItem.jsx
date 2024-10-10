import { IoMdMore } from "react-icons/io";
import { RiPlayList2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
const AllPlaylistItem = ({ playlist, playlistMoreOptionsHandler }) => {
	const { _id, name, videos } = playlist;
	const banner = videos[0].thumbnail;
	return (
		<div className="relative md:flex md:flex-col md:max-w-[22.5rem] md:shadow-lg my-1 text-white grid grid-cols-2 gap-x-4 md:before:w-[90%] md:before:h-[10%] md:before:bg-gray-500 md:before:absolute md:before:left-[50%] md:before:-translate-x-[50%] md:before:-top-1 md:before:rounded-full md:h-[250px]">
			<Link
				to={`/playlist/${_id}`}
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
				<span className="absolute bottom-0 right-0 flex items-center gap-1 px-1 mb-1 mr-1 bg-black rounded bg-opacity-55 text-smr md:text-base">
					<RiPlayList2Fill />
					<span>{videos?.length}</span>
				</span>
			</Link>
			<div className="flex justify-between flex-1 py-2 ">
				{/* details */}
				<Link
					to={`/playlist/${_id}`}
				>
					<p className="text-sm leading-4 lg:text-xl md:text-lg">
						{name}
					</p>
				</Link>

				<span
					onClick={() => {
						playlistMoreOptionsHandler(true, _id);
					}}
				>
					<IoMdMore className="text-[1rem]" />
				</span>
			</div>
		</div>
	);
};

export default AllPlaylistItem;
