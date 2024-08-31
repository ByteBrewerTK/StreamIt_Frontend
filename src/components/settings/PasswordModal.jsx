import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { apiRequest } from "../../services/api";
import toast from "react-hot-toast";
import { changePasswordError } from "../../utils/customErrorMessage";
import Loader from "../../components/ui/loader/Loader";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { useEffect } from "react";

const PasswordModal = ({ togglePassModal }) => {
	const [currentPassVisible, setCurrentPassVisible] = useState(false);
	const [confirmPassVisible, setConfirmPassVisible] = useState(false);
	const [updateLoading, setUpdateLoading] = useState(false);
	const [formError, setFormError] = useState("");
	const modalRef = useRef(null);
	const [formData, setFormData] = useState({
		currentPassword: "",
		newPassword: "",
		confirmPassword: "",
	});

	useEffect(() => {
		document.addEventListener("mousedown", modalCloseHandler);

		return () => {
			document.removeEventListener("mousedown", modalCloseHandler);
		};
	}, []);

	const formInputHandler = (e) => {
		const target = e.target;
		setFormError("");
		setFormData((prev) => ({
			...prev,
			[target.name]: target.value,
		}));
	};

	const modalCloseHandler = (e) => {
		if (modalRef.current && !modalRef.current.contains(e.target)) {
			togglePassModal(false);
		}
	};

	const submitHandler = (e) => {
		e.preventDefault();
		setUpdateLoading(true);
		const isEmptyField = Object.values(formData).some(
			(value) => value === ""
		);
		if (isEmptyField) {
			setFormError("All fields are required");
			setUpdateLoading(false);
			return;
		}

		const changePassword = async () => {
			try {
				await apiRequest("/user/change-password", "POST", formData);
				toast.success("Password changed successfully");
			} catch (error) {
				setFormError(changePasswordError(error.response.status));
				console.log(error);
			} finally {
				setUpdateLoading(false);
			}
		};
		changePassword();
	};

	return (
		<section className="absolute grid size-full backdrop-blur-sm place-items-center">
			<form
				ref={modalRef}
				onSubmit={submitHandler}
				className="w-[16rem] bg-primary rounded-lg p-4 shadow-lg relative overflow-hidden "
			>
				<span
					onClick={() => {
						togglePassModal(false);
					}}
					className="absolute top-0 right-0 p-1 text-black bg-white rounded-es-lg "
				>
					<IoMdClose />
				</span>
				<div className="w-full ">
					<span className="text-sm text-muted">Current password</span>
					<div className="flex items-center pr-2 bg-secondary text-muted_dark">
						<input
							type={currentPassVisible ? "text" : "password"}
							name="currentPassword"
							onInput={formInputHandler}
							className="w-full px-2 py-1 rounded-md outline-none bg-secondary"
						/>
						<span>
							<span
								onClick={() => {
									setCurrentPassVisible((prev) => !prev);
								}}
							>
								{!currentPassVisible ? <LuEyeOff /> : <LuEye />}
							</span>
						</span>
					</div>
				</div>
				<div className="w-full h-auto my-2 overflow-hidden ">
					<span className="text-sm text-muted">New password</span>
					<input
						type="password"
						name="newPassword"
						onInput={formInputHandler}
						className="w-full px-2 py-1 rounded-md outline-none bg-secondary"
					/>
				</div>
				<div className="w-full">
					<span className="text-sm text-muted">Confirm password</span>
					<div className="flex items-center pr-2 bg-secondary text-muted_dark">
						<input
							type={confirmPassVisible ? "text" : "password"}
							name="confirmPassword"
							onInput={formInputHandler}
							className="w-full px-2 py-1 rounded-md outline-none bg-secondary"
						/>
						<span
							onClick={() => {
								setConfirmPassVisible((prev) => !prev);
							}}
						>
							{!confirmPassVisible ? <LuEyeOff /> : <LuEye />}
						</span>
					</div>
				</div>
				{formError && (
					<p className="absolute text-red-500 text-smr">
						{formError}
					</p>
				)}
				<div className="flex items-center justify-between mt-8">
					<Link
						to={"/auth/reset-password"}
						className="text-sm text-muted"
					>
						Reset Password
					</Link>
					<button
						disabled={updateLoading}
						className=" px-2 w-20 h-8  text-black bg-white rounded-full font-[500] flex items-center justify-center disabled:bg-opacity-70"
					>
						{!updateLoading ? (
							"Update"
						) : (
							<span className="size-[20px]">
								<Loader />
							</span>
						)}
					</button>
				</div>
			</form>
		</section>
	);
};

export default PasswordModal;
