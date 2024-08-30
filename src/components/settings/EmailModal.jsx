import { IoMdClose } from "react-icons/io";
import { LuEye, LuEyeOff } from "react-icons/lu";
import Loader from "../ui/loader/Loader";
import { useState } from "react";
import { IoMdArrowForward } from "react-icons/io";
import { apiRequest } from "../../services/api";
import { changeEmailError, otpVerifyError } from "../../utils/customErrorMessage";
import OtpInput from "react-otp-input";
import toast from "react-hot-toast";

const EmailModal = ({ toggleMailModal }) => {
	const [otp, setOtp] = useState("");
	const [isPassVisible, setPassVisible] = useState(false);
	const [formError, setFormError] = useState("");
	const [otpError, setOtpError] = useState("");
	const [updateLoading, setUpdateLoading] = useState("");
	const [otpSent, setOtpSent] = useState(false);
	const [formData, setFormData] = useState({
		newEmail: "",
		password: "",
	});

	const otpContainerStyle = {
		display: "flex",
		justifyContent: "space-between",
		width: "100%",
	};
	const otpInputStyle = {
		width: "40px",
		height: "40px",
		borderRadius: "10px",
		userSelect: "none",
		fontSize: "26px",
		color: "#ffff",
		backgroundColor: "var(--color-secondary)",
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
		setFormError("");
	};

	const verifyOtp = async (e) => {
		e.preventDefault();
		setOtpError("");
		if (!otpSent || updateLoading) {
			return;
		}
		if (otp.length !== 6) {
			setOtpError("invalid otp");
			return;
		}

		setUpdateLoading(true);

		try {
			await apiRequest("/user/verify-email-otp", "POST", { otp });
            toggleMailModal(false);
			toast.success("Email changed");
		} catch (error) {
			const statusCode = error.response.status;
			setOtpError(otpVerifyError(statusCode));
			console.log(error);
		} finally {
			setUpdateLoading(false);
		}
	};

	const submitHandler = async (e) => {
		e.preventDefault();
		const { newEmail, password } = formData;

		if (!(newEmail.trim() && password)) {
			setFormError("All fields are required");
			return;
		}
		if (updateLoading) return;

		setUpdateLoading(true);

		try {
			await apiRequest("/user/change-email", "POST", formData);

			setOtpSent(true);
			toast.success("Otp sent");
		} catch (error) {
			const statusCode = error.response.status;
			setFormError(changeEmailError(statusCode));
			console.log(error);
		} finally {
			setUpdateLoading(false);
		}
	};
	return (
		<section className="absolute grid size-full backdrop-blur-sm place-items-center">
			<form
				onSubmit={submitHandler}
				className={`w-[18rem] bg-primary rounded-lg p-4 shadow-lg relative overflow-hidden h-[14rem] ${
					otpSent ? "hidden" : ""
				}`}
			>
				<span
					onClick={() => {
						toggleMailModal(false);
					}}
					className="absolute top-0 right-0 p-1 text-black bg-white rounded-es-lg "
				>
					<IoMdClose />
				</span>
				<div className="w-full ">
					<span className="text-sm text-muted">New Email</span>

					<input
						type="email"
						name="newEmail"
						onInput={handleChange}
						className="w-full px-2 py-1 rounded-md outline-none bg-secondary"
					/>
				</div>

				<div className="w-full">
					<span className="text-sm text-muted">Password</span>
					<div className="flex items-center pr-2 bg-secondary text-muted_dark">
						<input
							type={isPassVisible ? "text" : "password"}
							name="password"
							onInput={handleChange}
							className="w-full px-2 py-1 rounded-md outline-none bg-secondary"
						/>
						<span
							onClick={() => {
								setPassVisible((prev) => !prev);
							}}
						>
							{!isPassVisible ? <LuEyeOff /> : <LuEye />}
						</span>
					</div>
				</div>
				{formError && (
					<p className="absolute text-red-500 text-smr">
						{formError}
					</p>
				)}
				<button
					disabled={updateLoading}
					className=" px-2 w-9 aspect-square mt-8 text-black bg-white rounded-full font-[500] flex items-center justify-center disabled:bg-opacity-70 float-right"
				>
					{!updateLoading ? (
						<IoMdArrowForward />
					) : (
						<span className="size-[20px]">
							<Loader />
						</span>
					)}
				</button>
			</form>
			<form
				onSubmit={verifyOtp}
				className={`w-[18rem] bg-primary rounded-lg p-4 shadow-lg relative overflow-hidden h-[14rem] flex flex-col justify-center ${!otpSent ? "hidden" : ""}`}
			>
				<span
					onClick={() => {
						toggleMailModal(false);
					}}
					className="absolute top-0 right-0 p-1 text-black bg-white rounded-es-lg "
				>
					<IoMdClose />
				</span>
				<span className="text-muted">Enter OTP</span>
				<div>
					<OtpInput
						value={otp}
						onChange={setOtp}
						numInputs={6}
						placeholder="____"
						inputType="tel"
						renderInput={(props) => (
							<input
								{...props}
								className=" placeholder:text-[20px]"
							/>
						)}
						inputStyle={otpInputStyle}
						containerStyle={otpContainerStyle}
					/>
					<span className="float-right mt-2 text-smr text-muted">
						Resend otp
					</span>
				</div>
				{otpError && (
					<p className="absolute text-red-500 mt-11 text-smr">
						{otpError}
					</p>
				)}
				<button
					disabled={updateLoading}
					className=" px-2 h-9 mt-7 text-black bg-white rounded-full font-[500] flex items-center justify-center disabled:bg-opacity-70 float-right"
				>
					{!updateLoading ? (
						"Update"
					) : (
						<span className="size-[20px]">
							<Loader />
						</span>
					)}
				</button>
			</form>
		</section>
	);
};

export default EmailModal;
