import GeneralSettingsOptions from "../../components/settings/GeneralSettingsOptions";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { IoPlayForwardOutline } from "react-icons/io5";
import useDeviceType from "../../hooks/useDeviceType";
import DeviceAccessDenied from "../../components/shared/DeviceAccessDenied";
import useGetSettings from "../../hooks/data/useGetSettings";
import Loader from "../../components/ui/loader/Loader";
const GeneralSettingsPage = () => {
	const deviceType = useDeviceType();
	const { settingsData, settingsError, settingsLoading } = useGetSettings();

	if (deviceType === "Desktop") {
		return <DeviceAccessDenied />;
	}
	if (settingsLoading || settingsError) {
		return (
			<section className="grid size-full place-items-center">
				{settingsError ? (
					<span>{settingsError}</span>
				) : (
					<span className="size-[70px]">
						<Loader />
					</span>
				)}
			</section>
		);
	}
	const { autoPlayOnStart, autoPlayNext } = settingsData;
	const options = [
		{
			title: "Auto Play on Start",
			icon: AiOutlinePlayCircle,
			opt: "autoPlayOnStart",
			isEnabled: autoPlayOnStart,
		},
		{
			title: "Auto Play Next",
			icon: IoPlayForwardOutline,
			opt: "autoPlayNext",
			isEnabled: autoPlayNext,
		},
	];
	return (
		<section className="w-full mx-auto">
			{options.map((option, index) => (
				<GeneralSettingsOptions key={index} {...option} />
			))}
		</section>
	);
};

export default GeneralSettingsPage;
