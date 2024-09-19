import { Link } from "react-router-dom";
import formatVideoDuration from "../../utils/formatVideoDuration";

const HistoryVideoItem = ({ item }) => {
	console.log(item);
	return (
		<div className="flex flex-col w-full md:gap-x-4 md:flex-row">
			<Link to={`/watch?v=${item._id}`}>
				<div className="relative overflow-hidden rounded-lg max-w-[300px] aspect-video">
					<img
						src={item.thumbnail}
						alt=""
						loading="lazy"
						className="object-cover object-center"
					/>
					<span className="absolute px-1 bg-black bg-opacity-50 rounded-lg bottom-2 right-2">
						{formatVideoDuration(item.duration)}
					</span>
				</div>
			</Link>
			<div>
				<h3>{item.title}</h3>
				<div className="flex">
					<Link to={`/user/@${item.owner.username}`}>
						<div className="overflow-hidden rounded-full w-[40px] aspect-square">
							<img src={item.owner.avatar} alt="" />
						</div>
					</Link>
					<div>
						<Link>{item.owner.fullName}</Link>
						<span>{item.views}</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HistoryVideoItem;
