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
		console.log(moreOptionsRef.current.contains(event.target));
		if (
			moreOptionsRef.current &&
			!moreOptionsRef.current.contains(event.target)
		) {
			setMoreOptionsOpen(false);
		}
	};

	return (
		<section
			className={`absolute flex w-full h-full overflow-hidden transition duration-200 ${
				!isMoreOptionsOpen ? "translate-y-full" : ""
			} `}
		>
			<section
				ref={moreOptionsRef}
				className="bg-secondary z-[100] flex flex-col self-end rounded-t-lg  w-container mx-auto pt-8 relative overflow-hidden "
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
