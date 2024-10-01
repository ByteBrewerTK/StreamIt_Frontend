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
		<div className="grid w-full grid-cols-2 lg:flex lg:flex-col gap-x-4">
			<Link to={`/watch?v=${item._id}`}>
				<div className="relative overflow-hidden rounded-lg lg:max-w-[300px] aspect-video">
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
				<div className="flex justify-between w-full lg:text-2xl">
					<h3 className=" text-wrap text-smr">{item.title}</h3>
					<div>
						<button
							onClick={removeFromHistoryHandler}
							className="hidden md:inline"
						>
							<IoMdClose />
						</button>
						<button>
							<IoMdMore />
						</button>
					</div>
				</div>
				<div className="flex gap-x-2 text-muted_dark text-[.76rem] flex-col md:flex-row leading-none">
					<Link to={`/user/@${item.owner.username}`}>
						{item.owner.fullName}
					</Link>
					<span className="hidden md:inline">&bull;</span>
					<span>{formatCounts(item.views)}</span>
				</div>
			</div>
		</div>
	);
};

export default HistoryVideoItem;
