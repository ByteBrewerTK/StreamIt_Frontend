import { IoMdClose } from "react-icons/io";
import VideoItemMorePanel from "../user/VideoItemMorePanel";
import { useEffect } from "react";
import { useRef } from "react";

const MorePanel = ({
	setMoreOptionsOpen,
	isMoreOptionsOpen,
	videoId,
	removeVideoButton = false,
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
			setMoreOptionsOpen(false);
		}
	};

	return (
		<section
			className={`absolute flex w-full h-[0%] overflow-hidden transition duration-200 bottom-[2.5rem] ${
				isMoreOptionsOpen ? "h-[100%]" : ""
			} `}
		>
			<section
				ref={moreOptionsRef}
				className="bg-secondary z-[100] flex flex-col self-end rounded-t-lg  w-container mx-auto pt-8 relative overflow-hidden h-fit"
			>
				<span
					onClick={() => {
						setMoreOptionsOpen(false);
					}}
					className="absolute top-0 right-0 p-1 text-black bg-white rounded-es-lg "
				>
					<IoMdClose />
				</span>
				<VideoItemMorePanel
					isMoreOptionsOpen={isMoreOptionsOpen}
					setMoreOptionsOpen={setMoreOptionsOpen}
					videoId={videoId}
					removeVideoButton={removeVideoButton}
				/>
			</section>
		</section>
	);
};

export default MorePanel;
