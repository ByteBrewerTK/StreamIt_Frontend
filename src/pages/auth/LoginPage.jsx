import { useState } from "react";
import FormHeader from "../../components/ui/FormHeader";
import {
	FaRegEnvelope,
	FaRegEye,
	FaRegEyeSlash,
	FaRegUser,
} from "react-icons/fa6";
import { FiLock } from "react-icons/fi";
import OauthUi from "../../components/OauthUi";
import { Link } from "react-router-dom";
import CTAButton from "../../components/ui/CTAButton";

const LoginPage = () => {
	const [isPassVissible, setPassVissible] = useState(false);

	const handleToggle = () => {
		setPassVissible(!isPassVissible);
	};
	const form_header = {
		heading: "Welcome Back",
		description:
			"Log in to access your account and continue enjoying our features.",
	};
	return (
		<main className="grid w-full h-full place-items-center">
			<div className="space-y-2 w-container h-fit sm:w-[360px]  sm:p-4 sm:rounded-2xl sm:shadow-lg sm:py-8">
				{/* <FormHeader form_header={form_header} /> */}

				<div className="space-y-4">
					<form action="" className="flex flex-col space-y-2">
						<label className="flex items-center justify-between w-full px-4 py-2 space-x-2 border-[1.5px] rounded-full border-muted_border focus-within:border-black">
							<span className="text-muted">
								<FaRegUser />
							</span>
							<input
								type="username"
								className="w-full outline-none placeholder:text-muted placeholder:text-smr placeholder:select-none"
								placeholder="Enter a username"
							/>
						</label>
						<label className="flex items-center justify-between w-full px-4 py-2 space-x-2 border-[1.5px] rounded-full border-muted_border focus-within:border-black">
							<span className="text-muted">
								<FiLock />
							</span>
							<input
								type={isPassVissible ? "text" : "password"}
								className="w-full outline-none placeholder:text-muted placeholder:text-smr placeholder:select-none"
								placeholder="Enter new password"
							/>
							<span
								className="cursor-pointer text-muted"
								onClick={handleToggle}
							>
								{!isPassVissible ? (
									<FaRegEye />
								) : (
									<FaRegEyeSlash />
								)}
							</span>
						</label>

						<div className="flex items-center justify-between">
							<div className="inline-flex items-center text-smr">
								<label
									className="relative flex items-center py-2 rounded-full cursor-pointer "
									htmlFor="check"
								>
									<input
										type="checkbox"
										className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-5 before:w-5 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
										id="check"
									/>
									<span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-3.5 w-3.5"
											viewBox="0 0 20 20"
											fill="currentColor"
											stroke="currentColor"
											strokeWidth="1"
										>
											<path
												fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd"
											></path>
										</svg>
									</span>
								</label>
								<label
									className="pl-2 mt-px cursor-pointer select-none text-muted"
									htmlFor="check"
								>
									Remember me
								</label>
							</div>
							<Link to={"/"} className="text-smr text-muted">
								forgot password?
							</Link>
						</div>

						<CTAButton>Sign in</CTAButton>
					</form>
					<OauthUi />

					<div className="text-[0.75rem] text-muted text-center">
						Don't have an account?{" "}
						<Link
							to="/auth/sign-up"
							className="font-semibold text-black"
						>
							Sign up
						</Link>
					</div>
				</div>
			</div>
		</main>
	);
};

export default LoginPage;
