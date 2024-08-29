import { RiLockPasswordLine } from "react-icons/ri";
import { useState } from "react";
import PasswordModal from "../../components/settings/PasswordModal";
import { RiMailSettingsLine } from "react-icons/ri";

const SecurityPage = () => {
	const [passModalVisible, setPassModalVisible] = useState(false);

	const togglePassModal = (state) => {
		setPassModalVisible(state);
	};

	return (
		<section className="relative flex-1 w-full mx-auto">
			<div>
				{passModalVisible && (
					<PasswordModal togglePassModal={togglePassModal} />
				)}
			</div>
			<div>
				<div
					onClick={() => {
						togglePassModal(true);
					}}
					className="flex items-center px-4 py-2 space-x-2 hover:bg-white hover:bg-opacity-10 group"
				>
					<RiLockPasswordLine className="text-xl" />
					<span>Password</span>
				</div>
			</div>
		</section>
	);
};

export default SecurityPage;
