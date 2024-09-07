import { useState } from "react";
import { IoMdClose, IoMdCloseCircle } from "react-icons/io";
import ReactCrop, {
	centerCrop,
	convertToPixelCrop,
	makeAspectCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import setCanvasPreview from "../../utils/setCanvasPreview";
import { useRef } from "react";

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 150;

const ImageCropper = () => {
	const imgRef = useRef(null);
	const previewCanvasRef = useRef(null);
	const [fileError, setFileError] = useState("");
	const [imageSrc, setImageSrc] = useState("");
	const [crop, setCrop] = useState();

	const onSelectFile = (e) => {
		const file = e.target.files?.[0];

		console.log(file);
		if (!file) return;

		if (file.type.split("/").at(0) !== "image") {
			setFileError("Invalid file type");
			return;
		}

		const reader = new FileReader();

		reader.addEventListener("load", () => {
			const imageUrl = reader.result.toString() || "";
			setImageSrc(imageUrl);
		});
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
				<button className="absolute top-0 right-0 p-1 bg-white rounded-es-lg">
					<IoMdClose className="text-black" />
				</button>
				<div className="flex justify-between py-4">
					<input
						onChange={onSelectFile}
						type="file"
						accept="image/*"
						className="file:bg-gray-300 file:rounded-full file:outline-none file:border-none text-muted"
					/>
					<button>
						<IoMdCloseCircle className="text-red-500" />
					</button>
				</div>
				<div className="grid w-full mx-auto rounded-lg bg-secondary place-items-center">
					{imageSrc && (
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
										maxHeight: "10rem",
										objectFit: "center",
										width: "100%",
									}}
								/>
							</ReactCrop>
							<button
								onClick={() => {
									setCanvasPreview(
										imgRef.current,
										previewCanvasRef.current,
										convertToPixelCrop(
											crop,
											imgRef.current.width,
											previewCanvasRef.current.height
										)
									);
								}}
								className="h-8 px-4 text-center text-black bg-white rounded-full"
							>
								Crop
							</button>
							{crop && (
								<canvas
									ref={previewCanvasRef}
									className="mt-4"
									style={{
										border: "1px solid white",
										objectFit: "contain",
										width: "150px",
										height: "150px",
									}}
								></canvas>
							)}
						</>
					)}
				</div>
			</div>
		</section>
	);
};

export default ImageCropper;
