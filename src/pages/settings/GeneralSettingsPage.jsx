import GeneralSettingsOptions from "../../components/settings/GeneralSettingsOptions";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { IoPlayForwardOutline } from "react-icons/io5";
import useDeviceType from "../../hooks/useDeviceType";
import DeviceAccessDenied from "../../components/shared/DeviceAccessDenied";
const GeneralSettingsPage = () => {
	const deviceType = useDeviceType();
	const options = [
		{
			title: "Auto Play on Start",
			icon: AiOutlinePlayCircle,
			path: "password",
		},
		{
			title: "Auto Play Next",
			icon: IoPlayForwardOutline,
			path: "password",
		},
	];
	if (deviceType === "Desktop") {
		return <DeviceAccessDenied />;
	}
	return (
		<section className="w-full mx-auto">
			{options.map((option, index) => (
				<GeneralSettingsOptions key={index} {...option} />
			))}
		</section>
	);
};

export default GeneralSettingsPage;
