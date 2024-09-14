import DeviceAccessDenied from "../../../components/shared/DeviceAccessDenied";
import useDeviceType from "../../../hooks/useDeviceType";

const DesktopNotificationSetting = () => {
	const deviceType = useDeviceType();

	if (!deviceType === "Desktop") {
		return <DeviceAccessDenied type="Desktop" />;
	}
	return <div>This is Notifications setting</div>;
};

export default DesktopNotificationSetting;
