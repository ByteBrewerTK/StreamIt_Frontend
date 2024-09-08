import { useState } from "react";
import { IoMdClose, IoMdCloseCircle } from "react-icons/io";
import ReactCrop, {
	centerCrop,
	convertToPixelCrop,
	makeAspectCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { FiEdit } from "react-icons/fi";
import { FiUploadCloud } from "react-icons/fi";
import setCanvasPreview from "../../utils/setCanvasPreview";
import { useRef } from "react";

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 150;

const ImageCropper = ({ setAvatarPopupActive }) => {
	const imgRef = useRef(null);
	const previewCanvasRef = useRef(null);
	const fileInputRef = useRef(null);
	const [fileError, setFileError] = useState("");
	const [imageSrc, setImageSrc] = useState("");
	const [crop, setCrop] = useState(null);
	const [croppedImage, setCroppedImage] = useState(null);
	const [updateLoading, setUpdateLoading] = useState(false);

	const cropHandler = () => {
		setCanvasPreview(
			imgRef.current,
			previewCanvasRef.current,
			convertToPixelCrop(
				crop,
				imgRef.current.width,
				imgRef.current.height
			)
		);
		const croppedImage = previewCanvasRef.current;
		setCroppedImage(croppedImage);
		previewCanvasRef.current.style.display = "block";
	};
	const onSelectFile = (e) => {
		const file = e.target.files?.[0];

		if (!file) return;

		if (file.type.split("/")[0] !== "image") {
			setFileError("Invalid file type");
			return;
		}

		const reader = new FileReader();

		reader.onload = () => {
			const imageUrl = reader.result.toString() || "";
			setImageSrc(imageUrl);
		};
		reader.readAsDataURL(file);
	};

	const onImageLoad = (e) => {
		const { width, height } = e.currentTarget;
		const cropDimension = (MIN_DIMENSION / width) * 100;
		const crop = makeAspectCrop(
			{
				unit: "%",
				width: cropDimension,
			},
			ASPECT_RATIO,
			width,
			height
		);
		const centeredCrop = centerCrop(crop, width, height);
		setCrop(centeredCrop);
	};
	return (
		<section className="absolute z-50 grid size-full aspect-square place-items-center backdrop-blur-sm">
			<div className="relative w-[35rem] bg-primary rounded-lg shadow-lg  py-4 flex flex-col overflow-hidden">
				<button
					onClick={() => {
						setAvatarPopupActive(false);
					}}
					className="absolute top-0 right-0 p-1 bg-white rounded-es-lg"
				>
					<IoMdClose className="text-black" />
				</button>
				<div className="flex justify-between px-4 py-4">
					<input
						ref={fileInputRef}
						onChange={onSelectFile}
						type="file"
						accept="image/*"
						className="file:bg-gray-300 file:rounded-full file:outline-none file:border-none text-muted"
					/>
					<button
						onClick={() => {
							if (fileInputRef && fileInputRef.current.value) {
								fileInputRef.current.value = null;
							}
							setCrop(null);
							setFileError(null);
							setImageSrc(null);
							setCroppedImage(null);
						}}
					>
						<IoMdCloseCircle className="text-red-500" />
					</button>
				</div>
				<div className="grid w-full py-4 mx-auto rounded-lg bg-secondary place-items-center min-h-[10rem]">
					{!imageSrc || croppedImage ? (
						!croppedImage && (
							<div className="text-muted">
								Please select an image
							</div>
						)
					) : (
						<>
							<ReactCrop
								onChange={(__, percentCrop) => {
									setCrop(percentCrop);
								}}
								crop={crop}
								circularCrop={true}
								keepSelection={true}
								aspect={ASPECT_RATIO}
								minWidth={MIN_DIMENSION}
							>
								<img
									ref={imgRef}
									src={imageSrc}
									alt="upload"
									onLoad={onImageLoad}
									style={{
										maxWidth: "40rem",
										objectFit: "center",
										width: "100%",
									}}
								/>
							</ReactCrop>
							<button
								onClick={cropHandler}
								className="h-8 px-4 mt-4 text-center text-black bg-white rounded-full"
							>
								Crop
							</button>
						</>
					)}
					{crop && (
						<div className="flex flex-col items-center">
							<canvas
								ref={previewCanvasRef}
								className="mt-4"
								style={{
									display: "none",
									border: "1px solid white",
									objectFit: "contain",
									width: "150px",
									height: "150px",
									borderRadius: "100%",
								}}
							/>
							{croppedImage && (
								<div className="flex justify-between w-full mt-4 gap-x-4">
									<button
										onClick={() => {
											setCroppedImage(null);
											setCrop(null);
										}}
										className="flex items-center px-2 py-1 text-white bg-black border border-gray-600 rounded-full gap-x-2 bg-opacity-40"
									>
										<FiEdit />
										Edit
									</button>
									<button className="flex items-center px-2 py-1 text-black bg-white rounded-full gap-x-2">
										{" "}
										<FiUploadCloud />
										Update
									</button>
								</div>
							)}
						</div>
					)}
				</div>
			</div>
		</section>
	);
};

export default ImageCropper;
