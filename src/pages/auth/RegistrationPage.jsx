import {
	FaRegEnvelope,
	FaRegEye,
	FaRegEyeSlash,
	FaRegUser,
} from "react-icons/fa6";
import { FiLock } from "react-icons/fi";

import { useState } from "react";
import OauthUi from "../../components/OauthUi";
import { Link } from "react-router-dom";
import FormHeader from "../../components/ui/FormHeader";
import CTAButton from "../../components/ui/CTAButton";
import logo from "../../assets/logo.png";
import { apiInstance } from "../../services/api";
import Loader from "../../components/ui/loader/Loader";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import RegistrationSuccessPopup from "../../components/ui/RegistrationSuccessPopup";
import { extractResponseErrorMessage } from "../../utils/customErrorMessage";
import { useEffect } from "react";
import { getAccessToken } from "../../services/authServices";
import { validatePassword } from "../../utils/validatePassword";
import { validateFullName } from "../../utils/validateFullName";
import { useRef } from "react";
const RegistrationPage = () => {
	const [isLoading, setLoading] = useState(false);
	const [isPassVisible, setPassVisible] = useState(false);
	const navigate = useNavigate();
	const [isPopUpShow, setPopupShow] = useState(false);
	const [responseError, setResponseError] = useState("");
	const formRef = useRef(null);
	const initialFormData = {
		fullName: "",
		email: "",
		password: "",
	};
	const [formData, setFormData] = useState(initialFormData);
	useEffect(() => {
		if (getAccessToken()) {
			navigate("/");
		}
	}, []);
	const inputChangeHandler = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleToggle = () => {
		setPassVisible(!isPassVisible);
	};

	const submitHandler = async (e) => {
		e.preventDefault();

		setLoading(true);
		if (!validateFullName(formData.fullName)) {
			setResponseError(
				"Full name should be between 3 to 20 characters and contain only letters."
			);
			setLoading(false);
			return;
		}
		if (!validatePassword(formData.password)) {
			setResponseError(
				"Password must be 8-16 characters with at least one uppercase and one lowercase letter."
			);
			setLoading(false);
			return;
		}

		toast
			.promise(apiInstance.post("/user/register", formData), {
				loading: "Signing Up...",
				success: (response) => {
					if (response.data.statusCode === 200) {
						setPopupShow(true);
					}
					navigate(`/auth/resend/confirm/${formData.email}`);	
					return "Registration successfully completed";
				},
				error: (error) => {
					const statusCode = error.response.status;
					const errorMessage = extractResponseErrorMessage(
						error.response.request.responseText
					);
					setResponseError(errorMessage);
					if (statusCode === 409) {
						navigate(`/auth/login?email=${formData.email}`);
					}
					if (statusCode === 403) {
						navigate(`/auth/resend/confirm/${formData.email}`);
					}
					return errorMessage;
				},
			})
			.finally(() => {
				setResponseError("");
				setLoading(false);
			});
	};

	const form_header = {
		heading: "Register",
		description:
			"Complete the registration form for exclusive features and personalized content.",
	};

	return (
		<main className="relative grid w-full h-full overflow-y-auto place-items-center">
			<div className="space-y-2 w-container h-fit sm:w-[360px]  sm:p-4 sm:rounded-2xl sm:shadow-lg sm:py-8 ">
				<FormHeader {...form_header}>
					<img src={logo} alt="" width={60} height={60} />
				</FormHeader>

				<div className="relative space-y-6 ">
					<p className="w-full -mt-2 -mb-3 text-center text-red-500 text-smr">
						{!responseError ? "" : responseError}
					</p>

					<form
						ref={formRef}
						onSubmit={submitHandler}
						className="flex flex-col space-y-2"
					>
						<label className="flex items-center justify-between w-full px-4 py-2 space-x-2 border-[1.5px] rounded-full border-muted_border focus-within:border-black">
							<span className="text-muted">
								<FaRegEnvelope />
							</span>
							<input
								type="email"
								name="email"
								className="w-full outline-none placeholder:text-muted placeholder:text-smr placeholder:select-none"
								placeholder="Enter your email"
								onChange={inputChangeHandler}
								required
							/>
						</label>
						<label className="flex items-center justify-between w-full px-4 py-2 space-x-2 border-[1.5px] rounded-full border-muted_border focus-within:border-black">
							<span className="text-muted">
								<FaRegUser />
							</span>
							<input
								type="fullName"
								name="fullName"
								className="w-full outline-none placeholder:text-muted placeholder:text-smr placeholder:select-none"
								placeholder="Enter your full name"
								onChange={inputChangeHandler}
								required
							/>
						</label>
						<label className="flex items-center justify-between w-full px-4 py-2 space-x-2 border-[1.5px] rounded-full border-muted_border focus-within:border-black">
							<span className="text-muted">
								<FiLock />
							</span>
							<input
								type={isPassVisible ? "text" : "password"}
								name="password"
								className="w-full outline-none placeholder:text-muted placeholder:text-smr placeholder:select-none "
								placeholder="Enter new password"
								maxLength={16}
								onChange={inputChangeHandler}
								required
							/>
							<span
								className="cursor-pointer text-muted"
								onClick={handleToggle}
							>
								{!isPassVisible ? (
									<FaRegEye />
								) : (
									<FaRegEyeSlash />
								)}
							</span>
						</label>

						<CTAButton disabled={isLoading}>
							{!isLoading ? (
								"Sign up"
							) : (
								<span className="flex items-center justify-center w-full h-full">
									<span className="w-[1.3rem] aspect-square">
										<Loader />
									</span>
								</span>
							)}
						</CTAButton>
					</form>

					<OauthUi />

					<div className="text-[0.75rem] text-muted text-center">
						Already have an account?{" "}
						<Link
							to="/auth/login"
							className="font-semibold text-black"
						>
							Sign in
						</Link>
					</div>
				</div>
			</div>
		</main>
	);
};

export default RegistrationPage;
