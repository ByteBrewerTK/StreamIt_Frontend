import { useState } from "react";
import useSetNavTitle from "../../../hooks/useSetNavTitle";
import { LuCamera } from "react-icons/lu";
import toast from "react-hot-toast";
import { apiInstance, apiRequest } from "../../../services/api";
import Loader from "../../../components/ui/loader/Loader";
import { useContext } from "react";
import { UserContext } from "../../../contexts/userContext";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdClose, IoMdCloseCircle } from "react-icons/io";
import axios from "axios";
import DeviceAccessDenied from "../../../components/shared/DeviceAccessDenied";
import useDeviceType from "../../../hooks/useDeviceType";
import ImageCropper from "../../../components/ui/ImageCropper";
import ProgressBar from "../../../components/ui/ProgressBar";
import { Pencil } from "lucide-react";
import AgeDetectionPage from "../../AgeDetectionPage";

const Account = () => {
	const deviceType = useDeviceType();
	const { userData, setUserData } = useContext(UserContext);
	const [isAvatarPopupActive, setAvatarPopupActive] = useState(false);
	const [avatarUploading, setAvatarUploading] = useState(false);
	const [isUsernameAvailable, setUsernameAvailable] = useState(false);
	const [updateLoading, setUpdateLoading] = useState(false);
	const [checkLoading, setCheckLoading] = useState(false);
	const [uploadProgressActive, setUploadProgressActive] = useState(false);
	const [uploadProgress, setUploadProgress] = useState(0);
	const [isFaceDetectionModalOpen, setFaceDetectionModalOpen] =
		useState(false);
	const [isAgeVerified, setIsAgeVerified] = useState(false);

	const [infoFormData, setInfoFormData] = useState({
		fullName: userData.fullName || "",
		username: userData.username || "",
		age: userData.age || "",
		gender: userData.gender || "",
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

	const submitHandler = async () => {
		const { fullName, username, age, gender } = userData;
		if (
			!isUsernameAvailable &&
			infoFormData.fullName === fullName &&
			infoFormData.age === age &&
			infoFormData.gender === gender
		) {
			return;
		}
		setUpdateLoading(true);

		try {
			const response = await apiRequest(
				"/user/update-account-details",
				"POST",
				infoFormData
			);

			setUserData(response.data);
			setUsernameAvailable(false);

			toast.success("Account details updated successfully");
		} catch (error) {
			console.log(error);
			toast.error("Failed to update account details");
		} finally {
			setUpdateLoading(false);
		}
	};

	const avatarSubmitHandler = async (avatar) => {
		if (!avatar && setAvatarUploading) return;
		setAvatarUploading(true);

		const formData = new FormData();
		formData.append("avatar", avatar);

		try {
			setUploadProgressActive(true);
			const response = await apiRequest(
				"/user/update-avatar",
				"PATCH",
				formData,
				{
					onUploadProgress: (progressEvent) => {
						const percentCompleted = Math.round(
							progressEvent.progress * 100
						);

						setUploadProgress(percentCompleted);
					},
				}
			);
			userData.avatar = response.data.avatar;
			setUserData(userData);

			toast.success("Avatar uploaded successfully");
		} catch (error) {
			setUploadProgress(false);
			console.error(error);
			toast.error("Avatar uploading failed");
		} finally {
			setUploadProgressActive(false);
			setAvatarUploading(false);
		}
	};

	const inputChangeHandler = (e) => {
		const target = e.target;
		setInfoFormData((prev) => ({
			...prev,
			[target.name]: target.value,
		}));
	};
	const onSkipConfirmed = () => {
		setFaceDetectionModalOpen(false);
	};

	const isFormChanged = () => {
		return (
			infoFormData.fullName !== userData.fullName ||
			isUsernameAvailable ||
			infoFormData.age !== userData.age ||
			infoFormData.gender !== userData.gender
		);
	};
	const handleAfterVerification = (data) => {
		setInfoFormData((prev) => ({
			...prev,
			age: data.age,
			gender: data.gender,
		}));
		setTimeout(setFaceDetectionModalOpen(false), 2000);
	};

	if (!deviceType === "Desktop") {
		return <DeviceAccessDenied type="Desktop" />;
	}
	return (
		<main className="relative flex flex-col flex-1 text-white bg-secondary bg-opacity-90">
			{isFaceDetectionModalOpen && (
				<section className="absolute z-50 grid w-full h-full backdrop-blur-md place-items-center">
					<div className="w-fit ">
						<button
							onClick={() => {
								setFaceDetectionModalOpen(false);
							}}
							className="absolute translate-x-[50%] right-[50%] -translate-y-16 p-2 text-black bg-white rounded-full text-2xl"
						>
							<IoMdClose />
						</button>
						<AgeDetectionPage
							setIsAgeVerified={setIsAgeVerified}
							onSkipConfirmed={onSkipConfirmed}
							handleAfterVerification={handleAfterVerification}
						/>
					</div>
				</section>
			)}
			{uploadProgressActive && (
				<ProgressBar uploadProgress={uploadProgress} />
			)}
			{isAvatarPopupActive && (
				<ImageCropper
					setAvatarPopupActive={setAvatarPopupActive}
					avatarSubmitHandler={avatarSubmitHandler}
				/>
			)}
			<form
				onSubmit={(e) => {
					e.preventDefault();
					submitHandler();
				}}
				className="flex flex-col items-center py-6 bg-primary"
			>
				<div
					onClick={() => {
						setAvatarPopupActive(true);
					}}
					className="size-[100px] rounded-full overflow-hidden mb-3 relative border-2 border-white shadow-md hover:opacity-90 transition-opacity cursor-pointer"
				>
					<img
						src={userData.avatar}
						alt="Profile"
						className="object-cover size-full"
					/>
					<span className="absolute bottom-0 flex justify-center w-full p-1 mx-auto bg-black h-fit bg-opacity-60">
						<LuCamera className="text-lg text-white" />
					</span>
					{avatarUploading && (
						<div className="absolute inset-0 grid m-auto bg-black bg-opacity-60 place-items-center size-full">
							<span className="size-8">
								<Loader />
							</span>
						</div>
					)}
				</div>
				<span className="text-lg font-medium">{userData.fullName}</span>
				{userData.username && (
					<span className="text-sm text-muted">
						@{userData.username}
					</span>
				)}
			</form>
			<section className="flex flex-col justify-between flex-1 w-full max-w-md p-4 mx-auto gap-y-4">
				<div className="space-y-4">
					<div className="p-4 shadow-md bg-primary rounded-xl">
						<label className="block mb-3">
							<span className="text-muted font-medium block mb-1.5">
								Name
							</span>
							<input
								type="text"
								name="fullName"
								onChange={inputChangeHandler}
								className="w-full p-2.5 rounded-lg outline-none bg-primary border border-muted_border focus:border-white transition-colors text-muted_dark"
								defaultValue={userData.fullName}
							/>
						</label>
						<label className="block">
							<span className="text-muted font-medium block mb-1.5">
								Username
							</span>
							<div className="relative flex">
								<input
									type="text"
									name="username"
									onChange={inputChangeHandler}
									onInput={checkAvailable}
									className="w-full p-2.5 rounded-lg outline-none bg-primary border border-muted_border focus:border-white transition-colors text-muted_dark"
									defaultValue={userData.username}
									maxLength={20}
								/>
								{!(
									userData.username === infoFormData.username
								) &&
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

					<div className="p-4 shadow-md bg-primary rounded-xl">
						<div className="flex justify-between">
							<h3 className="mb-3 text-base font-medium text-white">
								Personal Information
							</h3>
							<button
								onClick={() => setFaceDetectionModalOpen(true)}
								className="text-white top-4 right-4 hover:text-white"
								aria-label="Edit Personal Info"
							>
								<Pencil className="w-5 h-5" />
							</button>
						</div>
						<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
							<label className="block">
								<span className="text-muted font-medium block mb-1.5">
									Age Group
								</span>
								<div className="w-full p-2.5 rounded-lg outline-none bg-primary border border-muted_border focus:border-white transition-colors text-muted_dark">
									<span>{userData.age}</span>
								</div>
							</label>
							<label className="block">
								<span className="text-muted font-medium block mb-1.5">
									Gender
								</span>
								<div
									name="gender"
									onChange={inputChangeHandler}
									className="w-full p-2.5 rounded-lg outline-none bg-primary border border-muted_border focus:border-white transition-colors text-muted_dark"
								>
									<span>{userData.gender}</span>
								</div>
							</label>
						</div>
					</div>
				</div>
				{isFormChanged() || updateLoading ? (
					<button
						onClick={submitHandler}
						className="flex items-center justify-center py-2.5 font-semibold text-black bg-white rounded-full hover:bg-opacity-90 transition-all"
					>
						{updateLoading ? (
							<span className="mr-1 size-5">
								<Loader />
							</span>
						) : (
							"Save Changes"
						)}
					</button>
				) : (
					<button
						className="flex items-center justify-center py-2.5 font-semibold text-black bg-white rounded-full disabled:bg-opacity-50 transition-all"
						disabled
					>
						Save Changes
					</button>
				)}
			</section>
		</main>
	);
};

export default Account;
