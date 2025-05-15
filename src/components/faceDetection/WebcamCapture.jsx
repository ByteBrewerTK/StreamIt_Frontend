import { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";

const WebcamCapture = ({ onCapture, onSkipConfirmed, confirmationToken }) => {
	const webcamRef = useRef(null);
	const [showModal, setShowModal] = useState(false);
	const [countdown, setCountdown] = useState(null);
	const [isCapturing, setIsCapturing] = useState(false);
	const [cameraLoaded, setCameraLoaded] = useState(false);
	const [cameraError, setCameraError] = useState(false);

	// Custom CSS for animations
	useEffect(() => {
		const style = document.createElement("style");
		style.innerHTML = `
      @keyframes flash {
        0%, 100% { opacity: 0; }
        50% { opacity: 1; }
      }
      .animate-flash {
        animation: flash 0.5s ease-out;
      }
      
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      .animate-fadeIn {
        animation: fadeIn 0.3s ease-out;
      }
      
      @keyframes scaleIn {
        from { transform: scale(0.95); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
      }
      .animate-scaleIn {
        animation: scaleIn 0.3s ease-out;
      }
      
      @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
      }
      .animate-pulse {
        animation: pulse 1s infinite;
      }
    `;
		document.head.appendChild(style);

		return () => {
			document.head.removeChild(style);
		};
	}, []);

	// Handle camera loading status
	useEffect(() => {
		const timer = setTimeout(() => {
			if (!cameraLoaded && webcamRef.current) {
				setCameraError(true);
			}
		}, 20000);

		return () => clearTimeout(timer);
	}, [cameraLoaded]);

	const startCountdown = () => {
		setIsCapturing(true);
		setCountdown(3);

		const timer = setInterval(() => {
			setCountdown((prev) => {
				if (prev <= 1) {
					clearInterval(timer);
					setTimeout(() => {
						captureImage();
						setIsCapturing(false);
					}, 500);
					return null;
				}
				return prev - 1;
			});
		}, 1000);
	};

	const captureImage = () => {
		const imageSrc = webcamRef.current.getScreenshot();
		fetch(imageSrc)
			.then((res) => res.blob())
			.then((blob) => {
				const file = new File([blob], "capture.jpg", {
					type: "image/jpeg",
				});
				onCapture(file, confirmationToken);
			})
			.catch((err) => {
				console.error("Error capturing image:", err);
			});
	};

	const handleSkipClick = () => {
		if (confirmationToken) {
			setShowModal(true);
		}
		handleConfirmSkip();
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

	const handleUserMedia = () => {
		setCameraLoaded(true);
		setCameraError(false);
	};

	const handleUserMediaError = (err) => {
		console.error("Camera Error: ", err);
		setCameraError(true);
	};

	const retryCameraAccess = () => {
		setCameraError(false);
		setCameraLoaded(false);
	};

	return (
		<div className="flex flex-col items-center w-full max-w-lg mx-auto">
			<div className="relative w-full mb-8 overflow-hidden bg-gray-900 shadow-2xl rounded-2xl">
				<div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-center p-3 bg-gradient-to-b from-black to-transparent">
					<h2 className="text-lg font-medium text-white">
						Age Verification
					</h2>
				</div>

				{cameraError ? (
					<div className="flex flex-col items-center justify-center p-10 bg-gray-900 h-72">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="w-16 h-16 mb-4 text-red-500"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
							/>
						</svg>
						<p className="mb-4 text-center text-white">
							Camera access denied or unavailable
						</p>
						<div className="flex space-x-3">
							<button
								onClick={retryCameraAccess}
								className="px-6 py-2 text-white bg-green-600 rounded-full hover:bg-green-700"
							>
								Retry Access
							</button>
							<button
								onClick={handleSkipClick}
								className="px-6 py-2 text-white bg-blue-600 rounded-full hover:bg-blue-700"
							>
								Continue without camera
							</button>
						</div>
					</div>
				) : (
					<div className="relative">
						<Webcam
							audio={false}
							ref={webcamRef}
							screenshotFormat="image/jpeg"
							width={480}
							height={360}
							className="object-cover w-full"
							videoConstraints={{
								facingMode: "user",
								width: 1280,
								height: 720,
							}}
							onUserMedia={handleUserMedia}
							onUserMediaError={handleUserMediaError}
						/>

						{!cameraLoaded && (
							<div className="absolute inset-0 flex items-center justify-center bg-gray-900">
								<div className="w-16 h-16 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin"></div>
							</div>
						)}

						{/* Overlay for countdown and flash */}
						{isCapturing && (
							<div className="absolute inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50">
								{countdown && (
									<div className="flex items-center justify-center w-24 h-24 text-4xl font-bold text-white bg-blue-600 rounded-full animate-pulse">
										{countdown}
									</div>
								)}
								{!countdown && (
									<div className="absolute inset-0 bg-white animate-flash"></div>
								)}
							</div>
						)}

						{/* Camera frame overlay */}
						<div className="absolute inset-0 m-4 border-2 border-blue-400 border-dashed pointer-events-none rounded-xl"></div>

						{/* Face position guide */}
						<div className="absolute w-48 h-48 transform -translate-x-1/2 -translate-y-1/2 border-2 border-blue-400 rounded-full pointer-events-none top-1/2 left-1/2"></div>
					</div>
				)}

				<div className="flex items-center justify-between w-full p-4 bg-gray-900">
					<button
						onClick={handleSkipClick}
						className="px-4 py-2 text-gray-300 transition-colors duration-300 border border-gray-700 rounded-full hover:bg-gray-800 hover:text-white"
					>
						Skip Verification
					</button>
					<button
						onClick={startCountdown}
						disabled={isCapturing || !cameraLoaded || cameraError}
						className={`px-8 py-2 text-white rounded-full transition-all duration-300 flex items-center ${
							isCapturing || !cameraLoaded || cameraError
								? "bg-gray-600 cursor-not-allowed"
								: "bg-blue-600 hover:bg-blue-700 hover:shadow-lg"
						}`}
					>
						{isCapturing ? (
							<span>Capturing...</span>
						) : (
							<>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="w-5 h-5 mr-2"
									viewBox="0 0 20 20"
									fill="currentColor"
								>
									<path
										fillRule="evenodd"
										d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
										clipRule="evenodd"
									/>
								</svg>
								Verify Now
							</>
						)}
					</button>
				</div>
			</div>

			<div className="w-full px-4 py-3 mt-2 text-sm text-center text-blue-800 bg-blue-100 rounded-xl">
				<p className="flex items-center justify-center">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="w-5 h-5 mr-2"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					Position your face within the circle and look at the camera
				</p>
			</div>

			{/* Modal with overlay animation */}
			{showModal && confirmationToken && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 animate-fadeIn">
					<div className="p-6 bg-white shadow-2xl rounded-2xl w-80 animate-scaleIn">
						<div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-red-500 bg-red-100 rounded-full">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="w-8 h-8"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
								/>
							</svg>
						</div>
						<h2 className="mb-3 text-xl font-bold text-center text-gray-800">
							Skip Verification?
						</h2>
						<p className="mb-5 text-sm text-center text-gray-600">
							If you skip, you will get limited content suitable
							only for kids. Are you sure you want to continue?
						</p>
						<div className="flex flex-col space-y-3">
							<button
								onClick={handleConfirmSkip}
								className="w-full px-4 py-3 text-white transition-colors duration-300 bg-red-600 rounded-xl hover:bg-red-700"
							>
								Yes, Skip Verification
							</button>
							<button
								onClick={handleCancelSkip}
								className="w-full px-4 py-3 text-gray-500 transition-colors duration-300 bg-gray-200 rounded-xl hover:bg-gray-200"
							>
								Cancel
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default WebcamCapture;
