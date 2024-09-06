import { RiLockPasswordLine } from "react-icons/ri";
import { useState } from "react";
import PasswordModal from "../../components/settings/PasswordModal";
import { RiMailSettingsLine } from "react-icons/ri";
import EmailModal from "../../components/settings/EmailModal";
import useDeviceType from "../../hooks/useDeviceType";
import DeviceAccessDenied from "../../components/shared/DeviceAccessDenied";

const SecurityPage = () => {
	const deviceType = useDeviceType();
	const [passModalVisible, setPassModalVisible] = useState(false);
	const [mailModalVisible, setMailModalVisible] = useState(false);

	const togglePassModal = (state) => {
		setPassModalVisible(state);
	};
	const toggleMailModal = (state) => {
		setMailModalVisible(state);
	};

	if (deviceType === "Desktop") {
		return <DeviceAccessDenied />;
	}

	return (
		<section className="relative flex-1 w-full mx-auto">
			<div>
				{passModalVisible && (
					<PasswordModal togglePassModal={togglePassModal} />
				)}
				{mailModalVisible && (
					<EmailModal toggleMailModal={toggleMailModal} />
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
				<div
					onClick={() => {
						toggleMailModal(true);
					}}
					className="flex items-center px-4 py-2 space-x-2 hover:bg-white hover:bg-opacity-10 group"
				>
					<RiMailSettingsLine className="text-xl" />
					<span>Change Email</span>
				</div>
			</div>
		</section>
	);
};

export default SecurityPage;
