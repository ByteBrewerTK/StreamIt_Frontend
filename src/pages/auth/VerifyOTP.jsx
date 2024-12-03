import FormHeader from "../../components/ui/FormHeader";
import FormTemplate from "../../components/ui/FormTemplate";
import { BsEnvelopeCheck } from "react-icons/bs";
import OtpInput from "react-otp-input";
import { useState } from "react";
import CTAButton from "../../components/ui/CTAButton";
import { apiInstance } from "../../services/api";
import { checkValidMail } from "../../utils/checkValidMail";
import { FiLock } from "react-icons/fi";
import { validatePassword } from "../../utils/validatePassword";
import Loader from "../../components/ui/loader/Loader";
import { useNavigate } from "react-router-dom";
import {
	saveTokens,
	saveUserData,
	setUserSettings,
} from "../../services/authServices";
import { extractResponseErrorMessage } from "../../utils/customErrorMessage";
import axios from "axios";
import CountdownTimer from "../../components/shared/CountDownTimer";

const VerifyOTP = ({
	email,
	initialTime,
	setInitialTime,
	submitHandler,
	resendLoading,
}) => {
	const API_URL = import.meta.env.VITE_API_URL;
	const [otp, setOtp] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [isCreatePassLoading, setCreatePassLoading] = useState(false);
	const [isNewPasswordModalOpen, setNewPasswordModalOpen] = useState(false);
	const [resetToken, setResetToken] = useState("");
	const navigate = useNavigate();
	const [passwords, setPasswords] = useState({
		password: "",
		confirm_password: "",
	});

	const form_header = {
		heading: `${
			!isNewPasswordModalOpen ? "OTP Verification" : "Set New Password"
		}`,
		description: !isNewPasswordModalOpen
			? `Please enter 6 digit OTP sent to ${email}`
			: "Please enter your new password below to complete the process",
	};

	const otpContainerStyle = {
		display: "flex",
		justifyContent: "space-between",
		width: "100%",
	};
	const otpInputStyle = {
		border: "2px solid  #dbdbdb",
		width: "3rem",
		aspectRatio: "1/1",
		borderRadius: "10px",
		userSelect: "none",
		fontSize: "26px",
	};

	const inputChangeHandler = (event) => {
		const field = event.target;
		setPasswords((prev) => ({
			...prev,
			[field.name]: field.value,
		}));
	};

	const otpSubmitHandler = async (event) => {
		event.preventDefault();
		setError("");
		if (loading) return;
		else if (!(otp.trim()?.length === 6)) {
			setError("Otp should be 6 Character");
			return;
		} else if (!otp.trim()) {
			setError("All parameter required");
			return;
		} else if (!checkValidMail(email)) {
			setError("Invalid email");
			return;
		}
		try {
			setLoading(true);
			const { data } = await apiInstance.post("/user/verify-reset", {
				otp,
				email,
			});
			console.log(data);
			if (data.statusCode === 200) {
				setResetToken(data.data.resetToken);
				setNewPasswordModalOpen(true);
			}
		} catch (error) {
			const errorMessage = extractResponseErrorMessage(
				error.response.request.responseText
			);
			setError(errorMessage);
			setNewPasswordModalOpen(false);
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	const changePasswordHandler = async (event) => {
		event.preventDefault();
		const { password, confirm_password } = passwords;
		if (!password || !confirm_password) {
			setError("All fields are required");
			return;
		} else if (!validatePassword(password)) {
			setError(
				"Password must be 8-16 characters with at least one uppercase and one lowercase letter."
			);
			return;
		} else if (password !== confirm_password) {
			setError("Both password doesn't match");
			return;
		}
		if (!resetToken) {
			setError("Unauthorized Access");
			return;
		}
		setCreatePassLoading(true);

		try {
			const { data } = await axios.patch(
				`${API_URL}/user/reset-password`,
				{ password: passwords.password },
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${resetToken}`,
					},
					withCredentials: true,
				}
			);
			if (data.statusCode === 200) {
				const { tokens, loggedInUser, settings } = data.data;
				saveTokens(tokens.accessToken, tokens.refreshToken);
				saveUserData(loggedInUser);
				setUserSettings(settings);
				navigate("/");
			}
		} catch (error) {
			console.error(error);
			let errorMessage;
			if (error.code == "ERR_NETWORK") {
				errorMessage = error.message;
			} else {
				errorMessage = extractResponseErrorMessage(
					error.response.request.responseText
				);
			}
			setError(errorMessage);
		} finally {
			setCreatePassLoading(false);
		}
	};

	return (
		<FormTemplate>
			<FormHeader {...form_header}>
				<BsEnvelopeCheck className="text-[60px] text-white p-2" />
			</FormHeader>
			{error && (
				<p className="text-sm text-center text-red-500">{error}</p>
			)}
			{isNewPasswordModalOpen ? (
				<form
					onSubmit={changePasswordHandler}
					className="flex flex-col w-full space-y-2"
				>
					<label className="flex items-center w-full px-4 py-2 gap-x-2 border-[1.5px] rounded-full border-muted_border focus-within:border-black">
						<span className="justify-start text-muted">
							<FiLock />
						</span>
						<input
							type="password"
							maxLength={16}
							placeholder="New Password"
							onChange={inputChangeHandler}
							name="password"
							className="w-full outline-none placeholder:text-muted placeholder:text-smr placeholder:select-none"
						/>
					</label>
					<label className="flex items-center justify-between w-full px-4 py-2 space-x-2 border-[1.5px] rounded-full border-muted_border focus-within:border-black">
						<span className="text-muted">
							<FiLock />
						</span>
						<input
							type="text"
							maxLength={16}
							placeholder="Confirm Password"
							onChange={inputChangeHandler}
							name="confirm_password"
							className="w-full outline-none placeholder:text-muted placeholder:text-smr placeholder:select-none"
						/>
					</label>

					<CTAButton
						disabled={!checkValidMail(email) || isCreatePassLoading}
					>
						{isCreatePassLoading ? (
							<div className="flex items-center justify-center size-full">
								<span className="size-[30px]">
									<Loader />
								</span>
							</div>
						) : (
							"Reset Password"
						)}
					</CTAButton>
				</form>
			) : (
				<form
					onSubmit={otpSubmitHandler}
					className="flex flex-col w-full space-y-6"
				>
					<div>
						<OtpInput
							value={otp}
							onChange={setOtp}
							numInputs={6}
							inputType="text"
							renderInput={(props) => (
								<input
									{...props}
									className=" placeholder:text-[20px]"
								/>
							)}
							inputStyle={otpInputStyle}
							containerStyle={otpContainerStyle}
						/>
						{initialTime > 0 ? (
							<div className="float-right">
								<CountdownTimer
									initialTime={initialTime}
									setResendTime={setInitialTime}
								/>
							</div>
						) : resendLoading ? (
							<span className="float-right text-smr font-[500] mt-2">
								Sending...
							</span>
						) : (
							<button
								type="button"
								onClick={submitHandler}
								className="text-smr font-[500] float-right mt-2"
							>
								Resend code
							</button>
						)}
					</div>

					<CTAButton
						disabled={
							!checkValidMail(email) ||
							!(otp.length == 6) ||
							loading
						}
					>
						{loading ? (
							<div className="flex items-center justify-center size-full">
								<span className="size-[30px]">
									<Loader />
								</span>
							</div>
						) : (
							"Submit"
						)}
					</CTAButton>
				</form>
			)}
		</FormTemplate>
	);
};

export default VerifyOTP;
