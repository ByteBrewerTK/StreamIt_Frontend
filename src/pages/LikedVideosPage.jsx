import DeviceAccessDenied from "../components/shared/DeviceAccessDenied";
import useDeviceType from "../hooks/useDeviceType";

const LikedVideosPage = () => {
	const deviceType = useDeviceType();

	if (!deviceType === "Desktop") {
		return <DeviceAccessDenied type="Desktop" />;
	}
	return <div className="text-white">This is liked videos page</div>;
};

export default LikedVideosPage;
