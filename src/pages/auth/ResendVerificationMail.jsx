import { apiInstance } from "../../services/api";
import { useState } from "react";
import { useParams } from "react-router-dom";

const ResendVerificationMail = () => {
	const [isSending, setIsSending] = useState(false);
	const [message, setMessage] = useState("");
	const {email} = useParams()

	const handleResendEmail = async () => {
		setIsSending(true);
		try {
			await apiInstance.patch(`/user/resend/confirm/${email}`);
			setMessage(
				"Verification email has been resent. Please check your inbox."
			);
		} catch (error) {
			setMessage(
				"Failed to resend the verification email. Please try again."
			);
			console.log(error);
		} finally {
			setIsSending(false);
		}
	};

	return (
		<div className="flex flex-col items-center justify-center h-screen p-6 text-center bg-gray-100">
			<div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
				<h1 className="mb-4 text-2xl font-semibold text-red-600">
					You are not verified yet
				</h1>
				<p className="mb-4 text-gray-600">
					Please verify your email address to continue.
				</p>
				<p className="mb-4 text-blue-600">
					Check your inbox at: <strong>{email}</strong>
				</p>
				<button
					onClick={handleResendEmail}
					disabled={isSending}
					className="px-4 py-2 font-bold text-white bg-red-600 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 disabled:opacity-50"
				>
					{isSending ? "Sending..." : "Resend Verification Email"}
				</button>
				{message && <p className="mt-4 text-green-500">{message}</p>}
			</div>
		</div>
	);
};

export default ResendVerificationMail;
