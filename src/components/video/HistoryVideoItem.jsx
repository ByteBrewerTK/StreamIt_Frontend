import { Link } from "react-router-dom";
import formatVideoDuration from "../../utils/formatVideoDuration";
import { IoMdClose } from "react-icons/io";
import { IoMdMore } from "react-icons/io";
import { formatCounts } from "../../utils/formatCounts";

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
			<div className="flex-1 border">
				<div className="flex justify-between w-full text-2xl border">
					<h3>{item.title}</h3>
					<div>
						<button>
							<IoMdClose />
						</button>
						<button>
							<IoMdMore />
						</button>
					</div>
				</div>
				<div className="flex gap-x-2">
					<Link>{item.owner.fullName}</Link>
					&bull;
					<span>{formatCounts(item.views)}</span>
				</div>
			</div>
		</div>
	);
};

export default HistoryVideoItem;
