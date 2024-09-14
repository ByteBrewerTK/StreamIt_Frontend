import DeviceAccessDenied from "../../../components/shared/DeviceAccessDenied";
import useDeviceType from "../../../hooks/useDeviceType";

const DesktopGeneralSetting = () => {
	const deviceType = useDeviceType();

	if (!deviceType === "Desktop") {
		return <DeviceAccessDenied type="Desktop" />;
	}
	return <div>This is general settings</div>;
};

export default DesktopGeneralSetting;
