import { useOutletContext } from "react-router-dom";
import DeviceAccessDenied from "../../components/shared/DeviceAccessDenied";
import ChannelVideos from "../../components/video/ChannelVideos";
import useDeviceType from "../../hooks/useDeviceType";
import { getUserData } from "../../services/authServices";
import { useEffect } from "react";

const UserVideosPage = () => {
	const { setNavVisible } = useOutletContext();
	const { username } = getUserData();
	const deviceType = useDeviceType();

	useEffect(() => {
		setNavVisible(true);

		return () => {
			setNavVisible(true);
		};
	});

	if (!deviceType === "Desktop") {
		return <DeviceAccessDenied type="Desktop" />;
	}
	return (
		<main>
			<ChannelVideos username={username} /> 
		</main>
	);
};

export default UserVideosPage;
