import { useState } from "react";
import FormHeader from "../../components/ui/FormHeader";
import FormTemplate from "../../components/ui/FormTemplate";
import CTAButton from "../../components/ui/CTAButton";
import { LuTextCursorInput } from "react-icons/lu";
import { FiLock } from "react-icons/fi";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";

const CreateNewPassword = () => {
	const [isPassVissible, setPassVissible] = useState(false);
	const [isPassMatched, setIsPassMatched] = useState(false);
	const [newPassword, setNewPassword] = useState("");

	const handleToggle = () => {
		setPassVissible(!isPassVissible);
	};
	const form_header = {
		heading: "Update password",
		description:
			"Please enter a new password. Ensure that your new password is different from the previous one for better security. ",
	};

	const newPasswordHandler = (event) => {
		setNewPassword(event.target.value);
	};
	const confirmPassHandler = (event) => {
		if (newPassword === event.target.value && event.target.value !== "") {
			setIsPassMatched(true);
		} else {
			setIsPassMatched(false);
		}
	};
	return (
		<FormTemplate>
			<FormHeader {...form_header}>
				<LuTextCursorInput className="text-[60px] text-white p-2" />
			</FormHeader>

			<div>
				<span className="text-smr font-[500] text-muted">
					New Password
				</span>
				<label className="flex items-center justify-between w-full px-4 py-2 space-x-2 border-[1.5px] rounded-full border-muted_border focus-within:border-black">
					<span className="text-muted">
						<FiLock />
					</span>
					<input
						type={isPassVissible ? "text" : "password"}
						className="w-full outline-none placeholder:text-muted placeholder:text-smr placeholder:select-none "
						placeholder="Enter new password"
						value={newPassword}
						maxLength={16}
						onChange={newPasswordHandler}
                        required
					/>
					<span
						className="cursor-pointer text-muted"
						onClick={handleToggle}
					>
						{isPassVissible ? <FaRegEye /> : <FaRegEyeSlash />}
					</span>
				</label>
			</div>

			<div className="pb-4">
				<span className="text-smr font-[500] text-muted">
					Confirm Password
				</span>
				<label className="flex items-center justify-between w-full px-4 py-2 space-x-2 border-[1.5px] rounded-full border-muted_border focus-within:border-black">
					<span className="text-muted">
						<FiLock />
					</span>
					<input
						type="password"
						className="w-full outline-none placeholder:text-muted placeholder:text-smr placeholder:select-none "
						placeholder="Enter new password"
						onChange={confirmPassHandler}
						maxLength={16}
                        required
					/>
					{isPassMatched ? (
						<FaCheckCircle className="text-green-500 text-mid" />
					) : (
						<IoMdCloseCircle className="text-red-500 text-mid" />
					)}
				</label>
			</div>
			<CTAButton>Update</CTAButton>
		</FormTemplate>
	);
};

export default CreateNewPassword;
