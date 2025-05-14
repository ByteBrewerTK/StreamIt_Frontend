import React, { useRef, useState } from "react";
import Webcam from "react-webcam";

const WebcamCapture = ({ onCapture, onSkipConfirmed, confirmationToken }) => {
	const webcamRef = useRef(null);
	const [showModal, setShowModal] = useState(false);

	const capture = () => {
		const imageSrc = webcamRef.current.getScreenshot();
		fetch(imageSrc)
			.then((res) => res.blob())
			.then((blob) => {
				const file = new File([blob], "capture.jpg", {
					type: "image/jpeg",
				});
				onCapture(file, confirmationToken);
			});
	};

	const handleSkipClick = () => {
		setShowModal(true);
	};

	const handleConfirmSkip = () => {
		setShowModal(false);
		if (onSkipConfirmed) {
			onSkipConfirmed();
		}
	};

	const handleCancelSkip = () => {
		setShowModal(false);
	};

	return (
		<div className="flex flex-col items-center gap-4">
			<Webcam
				audio={false}
				ref={webcamRef}
				screenshotFormat="image/jpeg"
				width={320}
				height={240}
				className="shadow-md rounded-xl"
			/>
			<div className="flex justify-between w-full">
				<button
					onClick={handleSkipClick}
					className="text-black underline hover:text-red-600"
				>
					Skip
				</button>
				<button
					onClick={capture}
					className="px-8 py-2 text-white bg-black rounded-full bg-opacity-70 hover:bg-opacity-100"
				>
					Verify
				</button>
			</div>

			{showModal && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
					<div className="p-6 text-center bg-white shadow-lg rounded-xl w-80">
						<h2 className="mb-4 text-lg font-semibold">
							Skip Confirmation?
						</h2>
						<p className="text-sm text-gray-600">
							If you skip, you will get limited content suitable
							only for kids. Do you want to continue?
						</p>
						<div className="flex justify-center gap-4 mt-6">
							<button
								onClick={handleCancelSkip}
								className="px-4 py-2 bg-gray-300 rounded-xl hover:bg-gray-400"
							>
								Cancel
							</button>
							<button
								onClick={handleConfirmSkip}
								className="px-4 py-2 text-white bg-red-600 rounded-xl hover:bg-red-700"
							>
								Yes, Skip
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default WebcamCapture;
