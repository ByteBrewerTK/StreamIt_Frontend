import FormHeader from "../../components/ui/FormHeader";
import FormTemplate from "../../components/ui/FormTemplate";
import { BsEnvelopeCheck } from "react-icons/bs";
import OtpInput from "react-otp-input";
import { useState } from "react";
import CTAButton from "../../components/ui/CTAButton";

const VerifyOTP = () => {
	const [otp, setOtp] = useState("");
	const form_header = {
		heading: "OTP Verification",
		description: "Please enter 4 digit OTP sent to talifkhan1@hotmail.com",
	};

	const otpContainerStyle = {
		display: "flex",
		justifyContent: "space-between",
		width: "100%",
		// maxWidth: "200px",
	};
	const otpInputStyle = {
		border: "2px solid  #dbdbdb",
		width: "60px",
		height: "60px",
		borderRadius: "10px",
		userSelect: "none",
		fontSize: "26px",
	};

	return (
		<FormTemplate>
			<FormHeader {...form_header}>
				<BsEnvelopeCheck className="text-[60px] text-white p-2" />
			</FormHeader>

			<form className="flex flex-col w-full space-y-6">
				<div>
					<OtpInput
						value={otp}
						onChange={setOtp}
						numInputs={4}
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
					<button className="text-smr font-[500] float-right mt-2">
						Resend code
					</button>
				</div>

				<CTAButton>Reset Password</CTAButton>
			</form>
		</FormTemplate>
	);
};

export default VerifyOTP;
