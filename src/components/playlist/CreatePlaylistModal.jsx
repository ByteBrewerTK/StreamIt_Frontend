import { useState } from "react";
import { IoEarthOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineLock } from "react-icons/md";
import { apiRequest } from "../../services/api";
import toast from "react-hot-toast";
import Loader from "../ui/loader/Loader";

const CreatePlaylistModal = ({ onClose, videoId }) => {
	const [isPrivacyDropdownOpen, setPrivacyDropdownOpen] = useState(false);
	const [playlistTitle, setPlaylistTitle] = useState("");
	const [createLoading, setCreateLoading] = useState(false);

	const privacyOptions = [
		{
			label: "Private",
			description: "Only you can view",
			icon: <MdOutlineLock className="text-white" />,
		},
		{
			label: "Public",
			description: "Anyone can search for and view",
			icon: <IoEarthOutline className="text-white" />,
		},
	];

	const [selectedPrivacyOption, setSelectedPrivacyOption] = useState(
		privacyOptions[0]
	);

	const handlePrivacySelection = (option) => {
		setSelectedPrivacyOption(option);
		setPrivacyDropdownOpen(false);
	};

	const playlistCreateHandler = async () => {
		if (!playlistTitle || createLoading) return;
		if (!(playlistTitle?.length >= 3 && playlistTitle?.length <= 30)) {
			toast.error("Enter text in valid length");
			return;
		}
		setCreateLoading(true);
		const data = { name: playlistTitle };
		try {
			const createResponse = await apiRequest(
				`/playlist/${selectedPrivacyOption.label}`,
				"POST",
				data
			);
			const playlistId = createResponse.data._id;
			await apiRequest(`/playlist/${playlistId}/${videoId}`, "PATCH");
			toast.success("Video added");
			onClose();
		} catch (error) {
			console.error(error);
			toast.error("Failed to create playlist");
		} finally {
			setCreateLoading(false);
		}
	};

	return (
		<section className="fixed inset-0 grid w-full h-full m-auto bg-black bg-opacity-50 place-items-center">
			<div className="w-[18rem] bg-primary rounded-lg px-4 py-6 space-y-4">
				<span className="text-white font-[500] text-lg">
					New playlist
				</span>
				<div className="space-y-4">
					<input
						onChange={(e) =>
							setPlaylistTitle(e.target.value.trim())
						}
						type="text"
						minLength={3}
						maxLength={30}
						className="w-full px-1 text-white bg-transparent border-b-2 outline-none border-muted_border"
						placeholder="Title"
					/>
					<div className="relative flex flex-col mt-2 text-white">
						<span className="text-sm text-muted">Privacy</span>
						<button
							onClick={() => setPrivacyDropdownOpen(true)}
							className="flex items-center justify-between w-full h-8 px-2 border-b-2"
						>
							{selectedPrivacyOption && (
								<>
									<button className="flex items-center gap-x-2">
										<span className="text-2xl">
											{selectedPrivacyOption.icon}
										</span>
										<span>
											{selectedPrivacyOption.label}
										</span>
									</button>
									<span>
										<IoIosArrowDown />
									</span>
								</>
							)}
						</button>
						{isPrivacyDropdownOpen && (
							<ul className="absolute z-50 w-full text-white rounded-sm top-5 bg-secondary">
								{privacyOptions.map((option, index) => (
									<li
										onClick={() =>
											handlePrivacySelection(option)
										}
										key={index}
										className={`flex items-center px-2 py-2 gap-x-2 cursor-pointer ${
											option.label ===
											selectedPrivacyOption.label
												? "bg-[#3b3939]"
												: ""
										}`}
									>
										<span className="text-2xl">
											{option.icon}
										</span>
										<div>
											<span>{option.label}</span>
											<p className="text-[0.6rem] text-muted_dark">
												{option.description}
											</p>
										</div>
									</li>
								))}
							</ul>
						)}
					</div>
				</div>
				<div className="flex justify-end w-full pt-2 text-sm text-blue-500 gap-x-3">
					<button onClick={onClose}>Cancel</button>
					<button
						onClick={playlistCreateHandler}
						disabled={!playlistTitle || createLoading}
						className="text-blue-500 disabled:text-opacity-50"
					>
						{!createLoading ? (
							"Create"
						) : (
							<div className="flex items-center">
								<span className="size-[15px]">
									<Loader />
								</span>
							</div>
						)}
					</button>
				</div>
			</div>
		</section>
	);
};

export default CreatePlaylistModal;
