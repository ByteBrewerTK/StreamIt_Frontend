import { IoMdClose } from "react-icons/io";
import { useRef, useEffect } from "react";
import PlaylistItemMorePanel from "./PlaylistItemMorePanel";

const PlaylistMorePanel = ({
	isPlaylistMoreOptionsOpen,
	setPlaylistMoreOptionsOpen,
	playlistId,
}) => {
	const moreOptionsRef = useRef(null);
	useEffect(() => {
		document.addEventListener("mousedown", outsideClick);

		return () => {
			document.removeEventListener("mousedown", outsideClick);
		};
	}, []);

	const outsideClick = (event) => {
		if (
			moreOptionsRef.current &&
			!moreOptionsRef.current.contains(event.target)
		) {
			setPlaylistMoreOptionsOpen(false);
		}
	};

	return (
		<section
			className={`absolute flex w-full h-full overflow-hidden transition duration-200  ${
				!isPlaylistMoreOptionsOpen ? "translate-y-full" : ""
			} `}
		>
			<section
				ref={moreOptionsRef}
				className="bg-secondary z-[100] flex flex-col self-end rounded-t-lg  w-container mx-auto pt-8 overflow-hidden bottom-[3rem] relative"
			>
				<span
					onClick={() => {
						setPlaylistMoreOptionsOpen(false);
					}}
					className="absolute top-0 right-0 p-1 text-black bg-white rounded-es-lg "
				>
					<IoMdClose />
				</span>
				<PlaylistItemMorePanel
					playlistId={playlistId}
					isPlaylistMoreOptionsOpen={isPlaylistMoreOptionsOpen}
					setPlaylistMoreOptionsOpen={setPlaylistMoreOptionsOpen}
				/>
			</section>
		</section>
	);
};

export default PlaylistMorePanel;
