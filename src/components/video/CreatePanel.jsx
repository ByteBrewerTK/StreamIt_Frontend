import { useState } from "react";
import { toast } from "react-hot-toast";
import ReactPlayer from "react-player";
import { LuPlus } from "react-icons/lu";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { apiRequest } from "../../services/api";

const CreatePanel = () => {
	const [videoFile, setVideoFile] = useState(null);
	const [videoPreview, setVideoPreview] = useState(null);
	const [thumbnailFile, setThumbnailFile] = useState(null);
	const [thumbnailPreview, setThumbnailPreview] = useState(null);
	const [isUploading, setUploading] = useState(false);

	const handleVideoFileChange = (event) => {
		const file = event.target.files[0];

		if (file && file.type.startsWith("video/")) {
			setVideoFile(file);
			setVideoPreview(URL.createObjectURL(file));
		} else {
			alert("Please select a valid video file.");
		}
	};
	const handleThumbnailFileChange = (event) => {
		const file = event.target.files[0];
		if (file && file.type.startsWith("image/")) {
			setThumbnailFile(file);
			setThumbnailPreview(URL.createObjectURL(file));
		} else {
			alert("Please select a thumbnail.");
		}
	};

	const removeThumbnail = () => {
		setThumbnailFile(null);
		setThumbnailPreview(null);
	};

	const submitHandler = async (event) => {
		event.preventDefault();
		if (isUploading) return;

		if (!(videoFile && thumbnailFile)) {
			// Ensure both files are present
			toast.error("All files are required, please reselect the files.");
			return;
		}

		const formData = new FormData();
		formData.append("videoFile", videoFile);
		formData.append("thumbnail", thumbnailFile);
		formData.append("title", event.target.title.value); // Append title
		formData.append("description", event.target.description.value); // Append description

		setUploading(true);

		toast
			.promise(apiRequest("/video", "POST", formData), {
				loading: "Uploading video...",
				success: () => {
					return "Video uploaded successfully!";
				},
				error: "Error while uploading video.",
			})
			.finally(() => {
				setUploading(false);
				// Optional: Clear form after successful upload
				setVideoFile(null);
				setVideoPreview(null);
				setThumbnailFile(null);
				setThumbnailPreview(null);
				event.target.reset(); // Reset the form fields
			});
	};

	return (
		<form className="w-full h-full" onSubmit={submitHandler}>
			<div>
				<div className="flex flex-col items-center justify-center w-full aspect-video">
					{videoPreview ? (
						<div className="w-full overflow-hidden bg-black rounded-lg aspect-video">
							<ReactPlayer
								url={videoPreview}
								width="100%"
								height="100%"
								controls
							/>
						</div>
					) : (
						<label className="flex flex-col items-center w-full h-full px-4 py-6 tracking-wide uppercase rounded-lg shadow-lg cursor-pointer bg-primary text-blue hover:bg-blue hover:text-white ">
							<svg
								className="w-8 h-8"
								fill="#ffff"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
							>
								<path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
							</svg>
							<span className="mt-2 text-base leading-normal text-white">
								Select a video
							</span>
							<input
								type="file"
								className="hidden"
								name="videoFile"
								accept="video/*"
								required
								onChange={handleVideoFileChange}
							/>
						</label>
					)}
				</div>
				<div className="flex items-center w-full h-16 px-2 mt-4 rounded bg-primary">
					<label className="flex items-center w-full h-full space-x-2 cursor-pointer">
						{thumbnailPreview ? (
							<>
								<img
									src={thumbnailPreview}
									alt=""
									className="object-cover object-center w-16 overflow-hidden border border-gray-500 rounded aspect-video"
								/>
								<div className="flex items-center justify-between flex-1">
									<span className="text-muted">
										{thumbnailFile.name}
									</span>
								</div>
							</>
						) : (
							<>
								<div className="p-1 bg-white rounded-full ">
									<LuPlus className="text-2xl" />
								</div>
								<span className="text-muted">
									Select a thumbnail
								</span>
							</>
						)}
						<input
							type="file"
							accept="image/*"
							className="hidden"
							name="thumbnail"
							required
							onChange={handleThumbnailFileChange}
						/>
						{thumbnailPreview && (
							<button onClick={removeThumbnail}>
								<AiOutlineCloseCircle className="z-10 text-xl text-red-500" />
							</button>
						)}
					</label>
				</div>

				<input
					type="text"
					placeholder="Title"
					name="title"
					className="w-full h-10 px-2 mt-4 text-white rounded bg-primary"
					required
				/>

				<textarea
					className="w-full h-[10rem] bg-primary mt-2 resize-none p-2 text-white"
					placeholder="Description"
					name="description"
					required
				></textarea>
			</div>
			<button className="float-right px-3 py-1 mt-4 bg-white rounded-full">
				Upload
			</button>
		</form>
	);
};

export default CreatePanel;
