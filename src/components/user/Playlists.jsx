import { Link } from "react-router-dom";
import PlaylistItem from "../ui/PlaylistItem";

const Playlists = ({ data, playlistMoreOptionsHandler }) => {
	
	return (
		<div className="my-4 h-[150px]">
			<div className="flex items-center justify-between mx-2">
				<h3 className=" text-xl font-[500]">History</h3>
				<Link to={"/user/playlists"} className="text-blue-500 text-smr">
					View all
				</Link>
			</div>
			{data?.length === 0 ? (
				<div className="grid w-full h-full place-content-center text-muted">
					No playlists found
				</div>
			) : (
				<div className="grid w-full grid-flow-col my-2 overflow-x-auto overflow-y-hidden auto-cols-max scrollbar-hide">
					{data.map((playlist) => (
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
		</div>
	);
};

export default Playlists;
