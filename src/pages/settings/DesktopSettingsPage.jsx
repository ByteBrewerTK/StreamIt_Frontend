import { MdOutlineManageAccounts } from "react-icons/md";
import SettingsOptions from "../../components/settings/SettingsOptions";
import { LuSettings2 } from "react-icons/lu";
import { FiLock } from "react-icons/fi";
import { FaRegBell } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { Outlet } from "react-router-dom";
import useDeviceType from "../../hooks/useDeviceType";
import DeviceAccessDenied from "../../components/shared/DeviceAccessDenied";

const options = [
	{
		title: "Account",
		icon: MdOutlineManageAccounts,
		path: "account",
	},
	{
		title: "General",
		icon: LuSettings2,
		path: "general",
	},
	{
		title: "Security",
		icon: FiLock,
		path: "security",
	},
	{
		title: "Notifications",
		icon: FaRegBell,
		path: "notifications",
	},
	{
		title: "About",
		icon: AiOutlineInfoCircle,
		path: "about",
	},
];

const DesktopSettingsPage = () => {
	const deviceType = useDeviceType();
	if (deviceType !== "Desktop") {
		return <DeviceAccessDenied type="Desktop" />;
	}
	return (
		<section className="flex size-full">
			<aside className="w-[13rem] border-r h-full border-muted hidden md:block">
				<div className="py-4">
					<span className="px-4 text-xl text-muted_dark text-bold">
						Settings
					</span>
				</div>
				<div>
					<SettingsOptions options={options} />
				</div>
			</aside>
			<Outlet />
		</section>
	);
};

export default DesktopSettingsPage;
