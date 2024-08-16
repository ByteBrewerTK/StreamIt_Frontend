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
const RegistrationPage = () => {
	const [isLoading, setLoading] = useState(false);
	const [isPassVissible, setPassVissible] = useState(false);
	const [formData, setFormData] = useState({
		fullName: "",
		email: "",
		password: "",
	});

	const formHandler = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};
	
	const handleToggle = () => {
		setPassVissible(!isPassVissible);
	};
	
	const submitHandler = async (e) => {
		e.preventDefault();
		setLoading(true)
		try {
			const response = await apiInstance.post("/user/register", formData);
			console.log(response);
			setLoading(false)
		} catch (error) {
			console.log("Error occurred while registering user : ", error);
			setLoading(false)
		}
	};

	const form_header = {
		heading: "Welcome",
		description:
		"Complete the registration form for exclusive features and personalized content.",
	};
	return (
		<main className="grid w-full h-full place-items-center">
			<div className="space-y-2 w-container h-fit sm:w-[360px]  sm:p-4 sm:rounded-2xl sm:shadow-lg sm:py-8">
				<FormHeader {...form_header}>
					<img src={logo} alt="" width={60} height={60} />
				</FormHeader>

				<div className="space-y-4">
					<form
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
								onChange={formHandler}
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
								onChange={formHandler}
								required
							/>
						</label>
						<label className="flex items-center justify-between w-full px-4 py-2 space-x-2 border-[1.5px] rounded-full border-muted_border focus-within:border-black">
							<span className="text-muted">
								<FiLock />
							</span>
							<input
								type={isPassVissible ? "text" : "password"}
								name="password"
								className="w-full outline-none placeholder:text-muted placeholder:text-smr placeholder:select-none "
								placeholder="Enter new password"
								onChange={formHandler}
								required
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
						already have an account?{" "}
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
