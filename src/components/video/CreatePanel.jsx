import { useState } from "react";
import { toast } from "react-hot-toast";
import ReactPlayer from "react-player";
import { LuPlus } from "react-icons/lu";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { apiRequest } from "../../services/api";
import { videoFileLimit } from "../../data/constants";
import { IoMdClose } from "react-icons/io";
import { useRef } from "react";
import { useEffect } from "react";
import useDeviceType from "../../hooks/useDeviceType";

const CreatePanel = ({
	handleCreatePanelOpen,
	setUploadProgressActive,
	setUploadProgress,
}) => {
	const [videoFile, setVideoFile] = useState(null);
	const [videoPreview, setVideoPreview] = useState(null);
	const [thumbnailFile, setThumbnailFile] = useState(null);
	const [thumbnailPreview, setThumbnailPreview] = useState(null);
	const [isUploading, setUploading] = useState(false);
	const formRef = useRef(null);
	const deviceType = useDeviceType();

	useEffect(() => {
		const handleOutsideClick = (e) => {
			if (formRef?.current && formRef?.current.contains(e.target)) {
				return;
			}
			clearCreatePanel();
			handleCreatePanelOpen();
		};

		window.addEventListener("mousedown", handleOutsideClick);

		return () => {
			window.removeEventListener("mousedown", handleOutsideClick);
		};
	}, [deviceType]);

	const handleVideoFileChange = (event) => {
		const file = event.target.files[0];
		if (file.size > videoFileLimit * (1024 * 1024)) {
			toast.error(`File size exceeded, limit ${videoFileLimit} MB`);
			return;
		}

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

	const clearCreatePanel = () => {
		setUploading(false);
		// Clear form after successful upload
		setVideoFile(null);
		setVideoPreview(null);
		setThumbnailFile(null);
		setThumbnailPreview(null);
	};

	const removeThumbnail = () => {
		setThumbnailFile(null);
		setThumbnailPreview(null);
	};

	const submitHandler = async (event) => {
		event.preventDefault();
		if (isUploading) {
			toast.error("Uploading under process");
			return;
		}

		if (!(videoFile && thumbnailFile)) {
			// Ensure both files are present
			toast.error("All files are required, please reselect the files.");
			return;
		}

		handleCreatePanelOpen(false);

		const formData = new FormData();
		formData.append("videoFile", videoFile);
		formData.append("thumbnail", thumbnailFile);
		formData.append("title", event.target.title.value); // Append title
		formData.append("description", event.target.description.value); // Append description

		setUploading(true);

		try {
			setUploadProgress(0);
			setUploadProgressActive(true);
			await apiRequest(
				"/video",
				"POST",
				formData,
				{
					onUploadProgress: (progressEvent) => {
						const percentCompleted = Math.round(
							progressEvent.progress * 100
						);
						setUploadProgress(percentCompleted);
					},
				},
				"multipart/form-data"
			);
			toast.success("Video uploaded successfully!");
			setUploadProgressActive(false);
		} catch (error) {
			setUploadProgressActive(false);
			console.log(error);
			toast.error("Error while uploading video.");
		} finally {
			clearCreatePanel();
			event.target.reset();
		}
	};

	return (
		<div className="grid w-full h-full overflow-y-auto place-items-center md:backdrop-blur-md">
			<form
				ref={formRef}
				onSubmit={submitHandler}
				className="relative size-full md:rounded-xl md:h-[90%] md:w-[70%] md:bg-primary overflow-hidden md:flex md:flex-col"
			>
				<div className="hidden w-full md:block h-fit">
					<button
						type="reset"
						onClick={() => {
							handleCreatePanelOpen();
							clearCreatePanel();
						}}
						className="float-right p-2 text-3xl text-black bg-white rounded-es-xl md:inline-block"
					>
						<IoMdClose />
					</button>
				</div>
				<div className="md:flex md:size-full md:flex-row-reverse">
					<div
						className={`flex flex-col items-center w-full md:justify-center aspect-video ${
							!videoPreview
								? "md:h-full"
								: "md:h-fit md:w-[20rem] md:mx-4"
						}`}
					>
						{videoPreview ? (
							<div className="rounded-b-lg size-full bg-secondary md:h-fit">
								<div className="w-full overflow-hidden bg-black rounded-lg aspect-video h-fit">
									<ReactPlayer
										url={videoPreview}
										width="100%"
										height="100%"
										controls
									/>
								</div>
								<div className="hidden p-2 mt-3 md:block">
									<label className="block text-sm text-muted">
										Filename
									</label>
									<p className="text-white truncate">
										{videoFile.name}
									</p>
								</div>
							</div>
						) : (
							<div className="w-full md:flex md:flex-col md:items-center md:gap-y-6">
								<label className="flex flex-col items-center w-full h-[10rem] px-4 py-6 tracking-wide uppercase rounded-lg shadow-lg cursor-pointer bg-primary text-blue hover:bg-blue hover:text-white md:h-[10rem] aspect-square md:w-auto md:bg-secondary md:rounded-full justify-center">
									<svg
										className="w-8 h-8 md:h-20 md:w-20"
										fill="#ffff"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
									>
										<path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
									</svg>
									<span className="mt-2 text-base leading-normal text-white md:hidden">
										Select a video
									</span>
									<input
										type="file"
										className="hidden"
										name="videoFile"
										id="select-file-btn"
										accept="video/*"
										onChange={handleVideoFileChange}
									/>
								</label>
								<span className="hidden -my-2 text-muted md:inline">
									Select a video to upload
								</span>
								<label
									htmlFor="select-file-btn"
									className="hidden px-4 py-2 text-black bg-white rounded-full cursor-pointer md:block"
								>
									Select file
								</label>
							</div>
						)}
					</div>
					<div
						className={`md:flex md:flex-col-reverse justify-end md:p-4 md:flex-1 md:pt-0 ${
							!videoPreview ? "md:hidden" : ""
						}`}
					>
						<div className="flex items-center mt-4 bg-primary md:h-fit md:py-0 md:rounded-lg md:flex-col md:w-fit">
							<span className="self-start hidden mb-2 text-muted_dark md:inline">
								Thumbnail
							</span>
							<label className="flex items-center w-full h-full cursor-pointer md:flex-col md:bg-secondary md:w-[14rem] md:h-auto md:aspect-video md:justify-center rounded md:gap-y-2 p-2 md:p-0">
								{thumbnailPreview ? (
									<>
										<img
											src={thumbnailPreview}
											alt=""
											className="object-cover object-center w-16 overflow-hidden border border-gray-500 rounded aspect-video md:w-full md:h-full"
										/>
										<div className="flex items-center justify-between flex-1 md:hidden">
											<span className="text-muted">
												{thumbnailFile.name}
											</span>
										</div>
									</>
								) : (
									<>
										<div className="p-1 bg-white rounded-full ">
											<LuPlus className="text-2xl md:text-3xl" />
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
									onChange={handleThumbnailFileChange}
								/>
								{thumbnailPreview && (
									<button onClick={removeThumbnail}>
										<AiOutlineCloseCircle className="z-10 text-xl text-red-500 md:hidden" />
									</button>
								)}
							</label>
						</div>

						<div>
							<input
								type="text"
								placeholder="Title"
								name="title"
								minLength={3}
								required
								className="w-full h-10 px-2 mt-4 text-white rounded bg-primary md:mt-0 md:bg-secondary focus:outline focus:outline-muted"
							/>

							<textarea
								placeholder="Description"
								name="description"
								minLength={10}
								required
								className="w-full h-[10rem] bg-primary mt-2 resize-none p-2 text-white md:bg-secondary focus:outline focus:outline-muted rounded"
							></textarea>
						</div>
					</div>
				</div>
				<div className="flex items-center justify-between w-full mt-4 md:justify-end md:p-4">
					<button
						type="reset"
						disabled={isUploading}
						onClick={() => {
							if (isUploading) {
								return;
							}
							clearCreatePanel();
							handleCreatePanelOpen();
						}}
						className="text-muted_dark disabled:text-muted md:hidden"
					>
						Cancel
					</button>
					<button className="px-3 py-1 bg-white rounded-full">
						Upload
					</button>
				</div>
			</form>
		</div>
	);
};

export default CreatePanel;
