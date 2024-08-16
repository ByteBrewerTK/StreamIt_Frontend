import { useEffect } from "react";
import { Link } from "react-router-dom";
import { apiInstance } from "../../services/api";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Loader from "../../components/ui/loader/Loader";
import ScreenLoading from "../../components/ui/ScreenLoading";

const VerificationSuccess = () => {
	const { pathname, search } = useLocation();
	const [error, setError] = useState("");
	const [isLoading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		const source = axios.CancelToken.source();
		const verifyEmail = async () => {
			try {
				const response = await apiInstance.patch(
					`/user/${pathname}${search}`
				);
				console.log(response);
				setLoading(false);
			} catch (error) {
				setError("Error occurred while verifying email");
				console.log("Error occurred while verifying email : ", error);
				setLoading(false);
			}
		};
		verifyEmail();
		return () => {
			source.cancel("Request terminated: Component unmounted.");
			setLoading(false);
		};
	}, []);

    if(isLoading) return (
		<ScreenLoading/>
	);
	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<div className="max-w-md p-8 text-center bg-white rounded-lg shadow-lg">
				<h1 className="mb-4 text-2xl font-bold text-black">
					{!error
						? "Verification Successful!"
						: "Verification Failed!"}
				</h1>
				<p className="mb-6 text-gray-700">
					{!error
						? "Your email has been successfully verified. You can now login to your account."
						: "Your email verification was unsuccessful. Please try again later."}
				</p>

				{!error ? (
					<Link
						to={"/auth/login"}
						className="px-4 py-2 text-white transition duration-300 bg-blue-500 rounded hover:bg-blue-600"
					>
						Go to Login
					</Link>
				) : (
					<p className="text-red-500">{error}</p>
				)}
			</div>
		</div>
	);
};

export default VerificationSuccess;
