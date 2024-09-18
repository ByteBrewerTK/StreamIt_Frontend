import { Link } from "react-router-dom";
import formatVideoDuration from "../../utils/formatVideoDuration";

const HistoryVideoItem = ({ item }) => {
	console.log(item);
	return (
		<div>
			<Link to={`watch?v=${item._id}`}>
				<img src={item.thumbnail} alt="" loading="lazy" />
				<span>{formatVideoDuration(item.duration)}</span>
			</Link>
			<div>
				<h3>{item.title}</h3>
				<div>
					<Link>{item.owner.fullName}</Link>
					<span>{item.views}</span>
				</div>
			</div>
		</div>
	);
};

export default HistoryVideoItem;
