import { Link } from "react-router-dom";
import formatVideoDuration from "../../utils/formatVideoDuration";
import { IoMdClose } from "react-icons/io";
import { IoMdMore } from "react-icons/io";
import { formatCounts } from "../../utils/formatCounts";
import { useState } from "react";
import toast from "react-hot-toast";
import { apiRequest } from "../../services/api";

const HistoryVideoItem = ({ item }) => {
	const [loading, setLoading] = useState(false);

	const removeFromHistoryHandler = async () => {
		if (loading) return;
		setLoading(true);
		try {
			await apiRequest(
				`/user/watch-history/remove/${item._id}`,
				"DELETE"
			);
			toast.success("Removed from watch history");
		} catch (error) {
			toast.error("Something went wrong");
			console.log(error);
		} finally {
			setLoading(false);
		}
	};
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
			<div className="flex-1">
				<div className="flex justify-between w-full text-2xl">
					<h3 className=" text-wrap">{item.title}</h3>
					<div>
						<button onClick={removeFromHistoryHandler}>
							<IoMdClose />
						</button>
						<button>
							<IoMdMore />
						</button>
					</div>
				</div>
				<div className="flex gap-x-2 text-muted_dark">
					<Link to={`/user/@${item.owner.username}`}>
						{item.owner.fullName}
					</Link>
					&bull;
					<span>{formatCounts(item.views)}</span>
				</div>
			</div>
		</div>
	);
};

export default HistoryVideoItem;
