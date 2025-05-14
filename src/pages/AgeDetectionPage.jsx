import { useState } from "react";
import WebcamCapture from "../components/faceDetection/WebcamCapture";
import AgeDetectionResult from "../components/faceDetection/AgeDetectionResult";
import { detectAge } from "../services/ageDetectionService";

const AgeDetectionPage = ({
	onSkipConfirmed,
	confirmationToken,
	verifyEmail,
	email
}) => {
	const [result, setResult] = useState(null);
	const [loading, setLoading] = useState(false);

	const handleCapture = async (imageFile) => {
		setLoading(true);
		try {
			const data = await detectAge(imageFile, confirmationToken, email);
			if (data.success === true) {
				setResult(data.success)
				verifyEmail();
			}
		} catch (error) {
			alert(error.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="max-w-full p-6 mx-auto">
			<h1 className="mb-4 text-2xl font-bold">Age Verification</h1>
			<WebcamCapture
				onCapture={handleCapture}
				onSkipConfirmed={onSkipConfirmed}
				confirmationToken={confirmationToken}
			/>
			{loading ? (
				<p className="mt-4 text-blue-600">Verifying...</p>
			) : (
				<AgeDetectionResult result={result} />
			)}
		</div>
	);
};

export default AgeDetectionPage;
