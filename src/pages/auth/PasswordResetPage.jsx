import { FaRegEnvelope } from "react-icons/fa6";
import FormHeader from "../../components/ui/FormHeader";
import FormTemplate from "../../components/ui/FormTemplate";
import { TbPasswordMobilePhone } from "react-icons/tb";
import CTAButton from "../../components/ui/CTAButton";
import { Link } from "react-router-dom";
import { useState } from "react";
import { checkValidMail } from "../../utils/checkValidMail";
import { apiInstance } from "../../services/api";
import Loader from "../../components/ui/loader/Loader";
import VerifyOTP from "./VerifyOTP";
import { extractResponseErrorMessage } from "../../utils/customErrorMessage";
import CountdownTimer from "../../components/shared/CountDownTimer";

const PasswordResetPage = () => {
	const [inputData, setInputData] = useState("");
	const [isMailValid, setMailValid] = useState(false);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [isOtpSend, setOtpSend] = useState(false);
	const [resendTime, setResendTime] = useState(0);

	const form_header = {
		heading: "Forgot Password?",
		description:
			"Don't worry we got you covered, Please enter your registered email",
	};

	const inputChangeHandler = (event) => {
		const { value } = event.target;
		setInputData(value);
		setMailValid(checkValidMail(value));
	};

	const submitHandler = async (event) => {
		event.preventDefault();

		setError("");
		setLoading(true);

		if (!isMailValid) {
			setError("Invalid Email");
			return;
		}

		try {
			const response = await apiInstance.post(`/user/reset-request`, {
				email: inputData,
			});
			const retryAfter = response.headers["retry-after"];
			if (response.status === 204) {
				setResendTime(retryAfter || 60);
				setOtpSend(true);
			}
		} catch (error) {
			console.error(error);
			let errorMessage;
			if (error.response && error.response.status === 429) {
				const retryAfter = error.response.headers["retry-after"];
				if (retryAfter) {
					setResendTime(parseInt(retryAfter));
				}
			} else if (error.code == "ERR_NETWORK") {
				errorMessage = error.message;
			} else {
				errorMessage = extractResponseErrorMessage(
					error.response.request.responseText
				);
			}
			setError(errorMessage);
		} finally {
			setLoading(false);
		}
	};
	if (isOtpSend) {
		return (
			<VerifyOTP
				email={inputData}
				initialTime={resendTime}
				submitHandler={submitHandler}
				setInitialTime={setResendTime}
				resendLoading={loading}
			/>
		);
	}
	return (
		<FormTemplate>
			<FormHeader {...form_header}>
				<TbPasswordMobilePhone className="text-[60px] text-white" />
			</FormHeader>

			<form onSubmit={submitHandler}>
				{error && (
					<p className="text-sm text-center text-red-500">{error}</p>
				)}
				<label className="flex items-center w-full px-4 py-2 gap-x-2 border-[1.5px] rounded-full border-muted_border focus-within:border-black">
					<span className="text-muted">
						<FaRegEnvelope />
					</span>
					<input
						type="text"
						maxLength={30}
						placeholder="Enter your email"
						onChange={inputChangeHandler}
						className="w-full outline-none placeholder:text-muted placeholder:text-smr placeholder:select-none"
					/>
				</label>

				<div className="relative mt-4">
					{resendTime > 0 && (
						<CountdownTimer
							initialTime={resendTime}
							setResendTime={setResendTime}
						/>
					)}
					<CTAButton disabled={!isMailValid || loading}>
						{loading ? (
							<div className="flex items-center justify-center size-full">
								<span className="size-[30px]">
									<Loader />
								</span>
							</div>
						) : (
							"Send OTP"
						)}
					</CTAButton>
					<Link
						to={"/auth/login"}
						className="float-right mt-3 font-semibold text-smr w-fit text-muted"
					>
						{" "}
						Return to login
					</Link>
				</div>
			</form>
		</FormTemplate>
	);
};

export default PasswordResetPage;
