import PlaylistItem from "../ui/PlaylistItem";

const Playlists = ({ data }) => {
    console.log(data)
	return (
		<div className="my-4 h-[190px]">
			<div className="mx-2">
				<h3 className="text-xl font-[500]">Playlists</h3>
			</div>
			<div className="grid w-full grid-flow-col my-2 overflow-x-auto overflow-y-hidden auto-cols-max scrollbar-hide">
				{data?.length === 0
					? "No playlist found"
					: data.map((playlist) => (
							<div key={playlist._id}>
								<PlaylistItem {...playlist} />
							</div>
					  ))}
			</div>
		</div>
	);
};

export default Playlists;
