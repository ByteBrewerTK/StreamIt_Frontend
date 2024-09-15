import DeviceAccessDenied from "../../components/shared/DeviceAccessDenied";
import useDeviceType from "../../hooks/useDeviceType";

const UserVideosPage = () => {
	const deviceType = useDeviceType();

	if (!deviceType === "Desktop") {
		return <DeviceAccessDenied type="Desktop" />;
	}
	return <div>This is user videos section</div>;
};

export default UserVideosPage;
