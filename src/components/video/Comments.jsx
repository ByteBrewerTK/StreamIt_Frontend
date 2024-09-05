import { useState } from "react";
import CommentItem from "./CommentItem";
import { IoMdClose } from "react-icons/io";
import { useEffect } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { apiRequest } from "../../services/api";
import Loader from "../ui/loader/Loader";
import { getUserData } from "../../services/authServices";

const Comments = ({
	comments,
	videoId,
	setCommentOpen,
	handleInitialComment,
	setResults,
}) => {
	const [newComment, setNewComment] = useState("");
	const [isCommentSending, setCommentSending] = useState(false);

	const userData = getUserData();
	const commentsData = comments.data.docs;

	useEffect(() => {
		if (comments && commentsData?.length > 0) {
			const data = commentsData[0];
			handleInitialComment(data);
		}
	}, [commentsData, handleInitialComment]);
	// handleInitialComment(commentsData[0])

	const addNewComment = async () => {
		if (newComment === "") return;
		setCommentSending(true);
		try {
			const [addedComment, refreshComment] = await Promise.all([
				apiRequest(`/comment/${videoId}`, "POST", {
					content: newComment,
				}),
				apiRequest(`/comment/${videoId}`),
			]);
			setResults((prev) => ({ ...prev, comments: refreshComment }));
		} catch (error) {
			console.log("Error occurred while sending comment", error);
		} finally {
			setNewComment("");
			setCommentSending(false);
		}
	};

	const closeDropdown = () => {
		setCommentOpen(false);
	};
	const commentInputHandler = (e) => {
		setNewComment(e.target.value);
	};

	return (
		<>
			<div
				className="flex justify-between p-4 border-b border-gray-600 md:hidden"
			>
				<h2 className="font-[500]">Comments</h2>
				<button onClick={closeDropdown}>{<IoMdClose />}</button>
			</div>
			<div className="flex-1 h-32 p-2 overflow-x-hidden overflow-y-auto bg-secondary scrollbar-w-[2px] ">
				{!commentsData.length ? (
					<div className="grid w-full h-full text-center place-items-center text-muted">
						No comments found
					</div>
				) : (
					commentsData.map((comment) => (
						<CommentItem key={comment._id} comment={comment} />
					))
				)}
			</div>
			<div className="flex items-center justify-between w-full px-2 py-2 rounded-full gap-x-2 bg-primary  md:py-0 md: md:h-[4rem]">
				<div className="overflow-hidden rounded-full aspect-square w-[40px] bg-secondary">
					<img
						src={userData.avatar}
						alt=""
						className="object-cover object-center "
					/>
				</div>
				<input
					type="text"
					placeholder="Add a comment..."
					onChange={commentInputHandler}
					value={newComment}
					className="w-full h-8 px-2 text-sm rounded outline-none bg-secondary outline-1 focus:outline-muted_border placeholder:text-smr"
				/>
				<button
					className="flex items-center justify-center h-full text-center bg-white rounded-full disabled:opacity-60 aspect-square md:h-[40px]"
					onClick={addNewComment}
					disabled={
						!((newComment && newComment.trim()) || isCommentSending)
					}
				>
					{!isCommentSending ? (
						<AiOutlineSend className="text-black" />
					) : (
						<span className="h-[20px] w-[20px] flex">
							<Loader color={"black"} />
						</span>
					)}
				</button>
			</div>
		</>
	);
};

export default Comments;
