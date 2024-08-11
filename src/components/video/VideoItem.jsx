import { IoMdMore } from "react-icons/io";
import { Link } from "react-router-dom";
const VideoItem = (element) => {
	let duration = `${(element.duration / 60).toFixed(2)}`.replace(".", ":");
	return (
		<Link to={`/watch?v=${element._id}`} className="rounded-md shadow-lg ">
			<div className="relative w-full overflow-hidden rounded-lg aspect-video">
				<img
					src={element.thumbnail}
					alt=""
					loading="lazy"
					className="object-cover object-center w-full "
				/>
				<span className="absolute px-1 text-white bg-black rounded-md bg-opacity-70 bottom-2 right-2">
					{duration}
				</span>
			</div>
			<div className="flex items-center justify-between p-2 space-x-2">
				<div className="flex items-center space-x-2">
					<Link
						to={"/"}
						className="overflow-hidden rounded-full  aspect-square w-[40px]"
					>
						<img
							src={element.avatar}
							width={40}
							height={40}
							alt=""
							loading="lazy"
							className="object-cover object-center"
						/>
					</Link>
					<div>
						<h3 className="mb-2 leading-4  font-[500]">
							{element.title}
						</h3>
						<div className="text-[0.7rem] flex flex-row gap-2 text-gray-400  md:flex-col md:gap-0 ">
							<Link to={`/channel/${element.username}`} className="transition-all md:text-smr hover:text-gray-100">
								{element.fullName}
							</Link>
							<div className="space-x-2">
								<span>{element.views} views</span>
								<span>{element.createAt}</span>
							</div>
						</div>
					</div>
				</div>
				<div>
					<IoMdMore className="text-[1.5rem]" />
				</div>
			</div>
		</Link>
	);
};

export default VideoItem;
