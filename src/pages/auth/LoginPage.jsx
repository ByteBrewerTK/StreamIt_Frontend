import { useState } from "react";
import FormHeader from "../../components/ui/FormHeader";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { FiLock } from "react-icons/fi";
import OauthUi from "../../components/OauthUi";
import { Link } from "react-router-dom";
import CTAButton from "../../components/ui/CTAButton";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/ui/loader/Loader";
import { apiInstance } from "../../services/api";
import {
	getAccessToken,
	saveTokens,
	saveUserData,
} from "../../services/authServices";
import { FaRegEnvelope } from "react-icons/fa";
import { loginUserError } from "../../utils/customErrorMessage";
import { UserContext } from "../../contexts/userContext";
import { useContext } from "react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const LoginPage = () => {
	const navigate = useNavigate();
	const { setUserData } = useContext(UserContext);
	const [isPassVisible, setPassVisible] = useState(false);
	const [isLoading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [searchParams] = useSearchParams();
	const url = searchParams.get("redirect_url");
	const redirectedEmail = searchParams.get("email");
	const redirect_url = url ? new URL(url).pathname : "/" || "/";

	const [formData, setFormData] = useState({
		email: "",
		password: "",
		rememberMe: false,
	});

	useEffect(() => {
		if (getAccessToken()) {
			navigate("/");
		}
		if (redirectedEmail) {
			setFormData((prev) => ({
				...prev,
				["email"]: redirectedEmail,
			}));
			const urlByRedirectLogin = new URL(location.href);
			urlByRedirectLogin.searchParams.delete("email");
			history.pushState({}, "", urlByRedirectLogin);
		}
	}, []);
	const submitHandler = async (e) => {
		setLoading(true);
		e.preventDefault();

		setError("");
		try {
			const { data: response } = await apiInstance.post(
				"/user/login",
				formData
			);

			const { accessToken, refreshToken } = response.data.tokens;

			const data = response.data.loggedInUser;

			setUserData(data);
			saveUserData(data);

			saveTokens(accessToken, refreshToken);

			setLoading(false);
			location.href = redirect_url;
		} catch (error) {
			console.log("Login Failed : ", error);
			const errorMessage =
				loginUserError(error.response.status) || "Something went wrong";
			setError(errorMessage);
			if (error.response && error.response.status === 403) {
				navigate(`/auth/resend/confirm/${formData.email}`);
			}
		} finally {
			setLoading(false);
		}
	};

	const formHandler = (event) => {
		const { name, type, checked, value } = event.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: type === "checkbox" ? checked : value,
		}));
	};

	const handleToggle = () => {
		setPassVisible(!isPassVisible);
	};
	const form_header = {
		heading: "Login",
		description:
			"Log in to access your account and continue enjoying our features.",
	};

	return (
		<main className="grid w-full h-full place-items-center">
			<div className="space-y-2 w-container h-fit sm:w-[360px]  sm:p-4 sm:rounded-2xl sm:shadow-lg sm:py-8">
				<FormHeader {...form_header}>
					<img src={logo} alt="" width={60} height={60} />
				</FormHeader>

				<div className="relative space-y-5">
					<p className="absolute w-full text-center text-red-500 -top-5 text-smr">
						{!error ? "" : error}
					</p>
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
								placeholder="Enter a email"
								onChange={formHandler}
								value={formData.email}
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
								className="w-full outline-none placeholder:text-muted placeholder:text-smr placeholder:select-none"
								placeholder="Enter password"
								onChange={formHandler}
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

						<div className="flex items-center justify-between">
							<div className="inline-flex items-center text-smr">
								<label
									className="relative flex items-center py-2 rounded-full cursor-pointer "
									htmlFor="check"
								>
									<input
										type="checkbox"
										name="rememberMe"
										className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-5 before:w-5 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
										id="check"
										onChange={formHandler}
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
							<Link
								to={"/auth/reset-password"}
								className="text-smr text-muted"
							>
								forgot password?
							</Link>
						</div>

						<CTAButton disabled={isLoading}>
							{!isLoading ? (
								"Sign in"
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
