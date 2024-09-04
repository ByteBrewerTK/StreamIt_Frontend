import { IoMdMore } from "react-icons/io";
import { RiPlayList2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
const PlaylistItem = ({ playlist, playlistMoreOptionsHandler }) => {
	const { _id, name, videos } = playlist;
	const banner = videos[0].thumbnail;
	return (
		<div className="relative flex flex-col w-[130px] mx-2 h-[145px] shadow-lg my-1 text-white before:w-[90%] before:h-[10%] before:bg-gray-500 before:absolute before:left-[50%] before:-translate-x-[50%] before:-top-1 before:rounded-full">
			<Link
				to={`/playlist/${_id}`}
				className="relative w-full overflow-hidden rounded-lg aspect-video "
			>
				{/* Banner */}
				<img
					src={banner}
					alt=""
					loading="lazy"
					className="object-cover object-center "
				/>
				<span className="absolute bottom-0 right-0 flex items-center gap-1 px-1 mb-1 mr-1 bg-black rounded bg-opacity-55 text-smr">
					<RiPlayList2Fill />
					<span>{videos?.length}</span>
				</span>
			</Link>
			<div className="flex justify-between flex-1 py-2 ">
				{/* details */}
				<Link
					to={`/playlist/${_id}`}
					className="flex flex-col justify-between"
				>
					<p className="text-sm leading-4">{name}</p>
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

export default PlaylistItem;
