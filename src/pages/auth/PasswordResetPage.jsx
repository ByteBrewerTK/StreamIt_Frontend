import { FaRegEnvelope } from "react-icons/fa6";
import FormHeader from "../../components/ui/FormHeader";
import FormTemplate from "../../components/ui/FormTemplate";
import { TbPasswordMobilePhone } from "react-icons/tb";
import CTAButton from "../../components/ui/CTAButton";
import { Link } from "react-router-dom";

const PasswordResetPage = () => {
	const form_header = {
		heading: "Forgot Password?",
		description:
			"Don't worry we got you covered, Please enter your registered email",
	};
	return (
		<FormTemplate>
			<FormHeader {...form_header}>
				<TbPasswordMobilePhone className="text-[60px] text-white" />
			</FormHeader>

			<label className="flex items-center justify-between w-full px-4 py-2 space-x-2 border-[1.5px] rounded-full border-muted_border focus-within:border-black">
				<span className="text-muted">
					<FaRegEnvelope />
				</span>
				<input
					type="email"
					className="w-full outline-none placeholder:text-muted placeholder:text-smr placeholder:select-none"
					placeholder="Enter your email"
				/>
			</label>

			<div className="relative">
				<CTAButton>Send OTP</CTAButton>
				<Link to={"/auth/login"} className="float-right mt-3 font-semibold text-smr w-fit text-muted">
					{" "}
					Return to login
				</Link>
			</div>
		</FormTemplate>
	);
};

export default PasswordResetPage;
