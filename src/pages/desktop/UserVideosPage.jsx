import DeviceAccessDenied from "../../components/shared/DeviceAccessDenied";
import useGetUserAllVideos from "../../hooks/data/useGetUserAllVideos";
import useDeviceType from "../../hooks/useDeviceType";
import { getUserData } from "../../services/authServices";

const UserVideosPage = () => {
	const { username } = getUserData();
	const { data, error, loading } = useGetUserAllVideos(username);
	const deviceType = useDeviceType();

	if (!deviceType === "Desktop") {
		return <DeviceAccessDenied type="Desktop" />;
	}
	return <main></main>;
};

export default UserVideosPage;
