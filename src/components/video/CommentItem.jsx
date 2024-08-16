import { getTimeAgo } from "../../utils/getTimeAgo";
import { RiMore2Line } from "react-icons/ri";
import { LuThumbsUp } from "react-icons/lu";
import { useState } from "react";
import { apiRequest } from "../../services/api";

const CommentItem = ({comment}) => {
	const [isLiked, setIsLiked] = useState(comment.isLiked);
	const [likes, setLikes] = useState(comment.likes);
	const [likeLoading, setLikeLoading] = useState(false);
	console.log(comment);

	const toggleLike = async () => {
		if (likeLoading) return;
		try {
			setLikeLoading(true);
			const response = await apiRequest(
				`/like/toggle/Comment/${comment._id}`,
				"PATCH"
			);
			if (response) {
				setIsLiked((prev) => !prev);
				if (!isLiked) {
					setLikes((prev) => prev + 1);
				} else {
					setLikes((prev) => prev - 1);
				}
			}
			console.log(response);
		} catch (error) {
			console.log(error);
		} finally {
			setLikeLoading(false);
		}
	};
	return (
		<div className="flex justify-between w-full py-2 space-x-2">
			<div className="overflow-hidden rounded-full w-[25px] h-[25px] border">
				<img
					src={comment.avatar}
					alt=""
					width={30}
					height={30}
					loading="lazy"
					className="object-cover object-center"
				/>
			</div>
			<div className="flex-1">
				<div>
					<div className="text-[0.6rem] space-x-2">
						<span>@{comment.username}</span>
						<span>{getTimeAgo(comment.createdAt)}</span>
					</div>

					<p className="w-full text-smr text-wrap">
						{comment.content}
					</p>
				</div>
				<div className="mt-2">
					<div className="flex items-center space-x-1 cursor-pointer text-smr">
						{likeLoading ? (
							<div className="animate-spin inline-block size-3 border-[2px] border-current border-t-transparent text-muted rounded-full dark:text-muted"></div>
						) : (
							<LuThumbsUp
								className={`${isLiked ? "fill-white" : ""}`}
								onClick={toggleLike}
							/>
						)}
						<span>{likes}</span>
					</div>
					<span></span>
					<span></span>
				</div>
			</div>
			<button>
				<RiMore2Line />
			</button>
		</div>
	);
};

export default CommentItem;
