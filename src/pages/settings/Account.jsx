import { useState } from "react";
import useSetNavTitle from "../../hooks/useSetNavTitle";
import { LuCamera } from "react-icons/lu";
import { MdOutlineModeEdit } from "react-icons/md";
import { useRef } from "react";
import toast from "react-hot-toast";
import { apiInstance, apiRequest } from "../../services/api";
import Loader from "../../components/ui/loader/Loader";
import { useContext } from "react";
import { UserContext } from "../../contexts/userContext";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import axios from "axios";

const Account = () => {
	const { userData, setUserData } = useContext(UserContext);
	const [isAvatarPopupActive, setAvatarPopupActive] = useState(false);
	const [avatar, setAvatar] = useState(null);
	const [avatarPreview, setAvatarPreview] = useState("");
	const avatarInputRef = useRef(null);
	const [avatarUploading, setAvatarUploading] = useState(false);
	const [isDisabled, setDisabled] = useState(true);
	const [isUsernameAvailable, setUsernameAvailable] = useState(false);
	const [updateLoading, setUpdateLoading] = useState(false);
	const [checkLoading, setCheckLoading] = useState(false);
	const [infoFormData, setInfoFormData] = useState({
		fullName: userData.fullName,
		username: userData.username,
	});

	useSetNavTitle("Account");
	const checkAvailable = async (e) => {
		const source = axios.CancelToken.source();
		const username = e.target.value;

		if (!username || checkLoading) return;
		setCheckLoading(true);

		try {
			const { data } = await apiInstance.get(`/user/check/${username}`, {
				cancelToken: source.token,
			});
			setUsernameAvailable(data.data.isAvailable);
		} catch (error) {
			if (axios.isCancel(error)) {
				console.log("Request canceled:", error.message);
			} else {
				toast.error("Something went wrong");
				console.log("Error:", error);
			}
		} finally {
			setCheckLoading(false);
		}
	};

	const avatarInputHandler = (e) => {
		const file = e.target.files[0];
		if (file && file.type.startsWith("image/")) {
			setAvatar(file);
			setAvatarPreview(URL.createObjectURL(file));
		}
	};

	const submitHandler = async () => {
		console.log("inside");
		const { fullName } = userData;
		if (!isUsernameAvailable && infoFormData.fullName === fullName) {
			return;
		}

		try {
			const response = await apiRequest(
				"/user/update-account-details",
				"POST",
				infoFormData
			);

			setUserData(response.data);
			setUsernameAvailable(false);

			toast.success("Account details updated");
		} catch (error) {
			console.log(error);
		}
	};

	const avatarSubmitHandler = async () => {
		console.log(avatarUploading);
		if (!avatar && setAvatarUploading) return;

		setAvatarUploading(true);

		const formData = new FormData();
		formData.append("avatar", avatar);

		avatarPopupClose();

		try {
			const response = await apiRequest(
				"/user/update-avatar",
				"PATCH",
				formData
			);

			userData.avatar = response.data.avatar;
			setUserData(userData);

			toast.success("Avatar uploaded successfully");
		} catch (error) {
			console.error(error);
			toast.error("Avatar uploading failed");
		} finally {
			setAvatarUploading(false);
		}
	};

	const avatarPopupClose = () => {
		avatarInputRef.current.value = "";
		setAvatarPreview("");
		setAvatar(null);
		setAvatarPopupActive(false);
	};
	const inputChangeHandler = (e) => {
		const target = e.target;
		setInfoFormData((prev) => ({
			...prev,
			[target.name]: target.value,
		}));
	};

	return (
		<main className="relative flex flex-col flex-1 text-white">
			<section
				className={`absolute z-10 grid size-full place-items-center backdrop-blur-sm ${
					!isAvatarPopupActive ? "hidden" : ""
				}`}
			>
				<div className="w-[200px] bg-primary rounded-lg flex flex-col items-center py-4 ">
					<label>
						<div className="size-[80px] rounded-full overflow-hidden mb-2 relative border">
							<img
								src={
									avatarPreview
										? avatarPreview
										: userData.avatar
								}
								alt=""
							/>
							<span className="absolute bottom-0 flex justify-center w-full p-1 mx-auto bg-black h-fit bg-opacity-40 ">
								<MdOutlineModeEdit className="text-lg text-white" />
							</span>
						</div>
						<input
							type="file"
							accept="image/*"
							ref={avatarInputRef}
							onInput={avatarInputHandler}
							className="hidden"
						/>
					</label>
					<div className="flex justify-between w-full px-4 mt-2">
						<button
							onClick={avatarPopupClose}
							className="text-muted hover:text-muted_dark"
						>
							Cancel
						</button>
						<button
							onClick={avatarSubmitHandler}
							disabled={!avatar}
							className="px-2 py-1 text-black bg-white rounded-full disabled:bg-opacity-65"
						>
							Submit
						</button>
					</div>
				</div>
			</section>
			<form
				onSubmit={submitHandler}
				className="flex flex-col items-center py-4 bg-primary"
			>
				<div
					onClick={() => {
						setAvatarPopupActive(true);
					}}
					className="size-[80px] rounded-full overflow-hidden mb-2 relative"
				>
					<img src={userData.avatar} alt="" />
					<span className="absolute bottom-0 flex justify-center w-full p-1 mx-auto bg-black h-fit bg-opacity-40 ">
						<LuCamera className="text-lg text-white" />
					</span>
					{avatarUploading && (
						<div className="absolute inset-0 grid m-auto bg-black bg-opacity-60 place-items-center size-full">
							<span className=" size-8">
								<Loader />
							</span>
						</div>
					)}
				</div>
				<span>{userData.fullName}</span>
			</form>
			<section className="flex flex-col justify-between flex-1 p-4 gap-y-2 ">
				<div>
					<label className="">
						<span className="text-muted">Name</span>
						<input
							type="text"
							name="fullName"
							onChange={inputChangeHandler}
							className="w-full p-2 rounded-md outline-none bg-primary focus:outline-muted_border outline-1 text-muted_dark"
							defaultValue={userData.fullName}
						/>
					</label>
					<label>
						<span className="text-muted">Username</span>
						<div className="relative flex">
							<input
								type="text"
								name="username"
								onChange={inputChangeHandler}
								onInput={checkAvailable}
								className="w-full p-2 rounded-md outline-none bg-primary focus:outline-muted_border outline-1 text-muted_dark"
								defaultValue={userData.username}
								maxLength={20}
							/>
							{!(userData.username === infoFormData.username) &&
								infoFormData.username && (
									<span className="absolute top-[50%] -translate-y-[50%] right-2">
										{isUsernameAvailable ? (
											<FaCheckCircle className="text-green-500" />
										) : (
											<IoMdCloseCircle className="text-red-500" />
										)}
									</span>
								)}
						</div>
					</label>
				</div>
				{infoFormData.fullName !== userData.fullName ||
				isUsernameAvailable ||
				updateLoading ? (
					<button
						onClick={submitHandler}
						className="flex items-center justify-center h-8 py-1 font-semibold text-black bg-white rounded-full"
					>
						Update
					</button>
				) : (
					<button
						className="flex items-center justify-center h-8 py-1 font-semibold text-black bg-white rounded-full disabled:bg-opacity-50"
						disabled
					>
						{updateLoading ? (
							<span className="size-4">
								<Loader />
							</span>
						) : (
							"Update"
						)}
					</button>
				)}
			</section>
		</main>
	);
};

export default Account;
