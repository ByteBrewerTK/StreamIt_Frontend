import { RiLockPasswordLine, RiMailSettingsLine } from "react-icons/ri";
import { useState } from "react";
import DeviceAccessDenied from "../../../components/shared/DeviceAccessDenied";
import PasswordModal from "../../../components/settings/PasswordModal";
import EmailModal from "../../../components/settings/EmailModal";
import useDeviceType from "../../../hooks/useDeviceType";

const DesktopSecurityPage = () => {
	const deviceType = useDeviceType();
	const [passModalVisible, setPassModalVisible] = useState(false);
	const [mailModalVisible, setMailModalVisible] = useState(false);

	const togglePassModal = (state) => {
		setPassModalVisible(state);
	};
	const toggleMailModal = (state) => {
		setMailModalVisible(state);
	};

	if (deviceType !== "Desktop") {
		return <DeviceAccessDenied type="Desktop" />;
	}

	return (
		<section className="relative flex-1 w-full mx-auto">
			<div>
				<div className="flex items-center px-4 py-2 space-x-2 hover:bg-white hover:bg-opacity-10 group">
					<span className="text-2xl text-muted">Change Email</span>
				</div>
				<div className="flex items-center px-4 py-2 space-x-2 hover:bg-white hover:bg-opacity-10 group">
					<span className="text-2xl text-muted">Change Password</span>
				</div>
			</div>
		</section>
	);
};

export default DesktopSecurityPage;
