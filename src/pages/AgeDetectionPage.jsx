import { useState } from "react";
import WebcamCapture from "../components/faceDetection/WebcamCapture";
import AgeDetectionResult from "../components/faceDetection/AgeDetectionResult";
import { detectAge } from "../services/ageDetectionService";

const AgeDetectionPage = ({
	onSkipConfirmed,
	confirmationToken,
	verifyEmail,
	email,
	handleAfterVerification,
}) => {
	const [result, setResult] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleCapture = async (imageFile) => {
		setLoading(true);
		try {
			const response = await detectAge(
				imageFile,
				email,
				confirmationToken
			);
			if (response.statusCode === 200) {
				setResult(true);
				if (email && confirmationToken) {
					verifyEmail();
				} else {
					handleAfterVerification(response.data);
				}
			}
		} catch (error) {
			alert(error.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="relative max-w-full mx-auto">
			<WebcamCapture
				onCapture={handleCapture}
				onSkipConfirmed={onSkipConfirmed}
				confirmationToken={confirmationToken}
			/>
			{loading ? (
				<div className="absolute inset-0 z-50 grid w-full h-full mx-auto bg-black rounded-lg bg-opacity-80 place-items-center">
					<p className="mt-4 text-2xl text-white">Verifying...</p>
				</div>
			) : (
				<AgeDetectionResult result={result} />
			)}
		</div>
	);
};

export default AgeDetectionPage;
