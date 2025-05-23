import { MdOutlineSpaceDashboard,MdSpaceDashboard, MdOutlineSubscriptions } from "react-icons/md";
import { GoHome } from "react-icons/go";
import { GrChannel } from "react-icons/gr";
import { RiPlayList2Fill } from "react-icons/ri";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { LuThumbsUp } from "react-icons/lu";
import { GrHistory } from "react-icons/gr";
import { GoHomeFill } from "react-icons/go";
import { MdSubscriptions } from "react-icons/md";
import { BiSolidTv } from "react-icons/bi";
import { RiPlayList2Line } from "react-icons/ri";
import { MdVideoLibrary } from "react-icons/md";
import { IoMdThumbsUp } from "react-icons/io";
import { FaRegCircle } from "react-icons/fa";
import { FaCircle } from "react-icons/fa";
import { getUserData } from "../services/authServices";

const userData = getUserData();
let username = "";
if (userData) {
	username = userData.username;
}

export const sideNavItems = [
	{
		name: "Home",
		icon: GoHome,
		activeIcon: GoHomeFill,
		path: "/",
	},
	{
		name: "Lynk",
		icon: FaRegCircle,
		activeIcon: FaCircle,
		path: "/user/lynk",
	},
	{
		name: "Subscriptions",
		icon: MdOutlineSubscriptions,
		activeIcon: MdSubscriptions,
		path: "/user/subscriptions",
	},
	{
		name: "Your Channel",
		icon: GrChannel,
		activeIcon: BiSolidTv,
		path: `/user/@${username}`,
	},
	{
		name: "History",
		icon: GrHistory,
		activeIcon: GrHistory,
		path: "/user/history",
	},
	{
		name: "Playlist",
		icon: RiPlayList2Line,
		activeIcon: RiPlayList2Fill,
		path: "/user/playlists",
	},
	{
		name: "Your Videos",
		icon: MdOutlineVideoLibrary,
		activeIcon: MdVideoLibrary,
		path: "/user/videos",
	},
	{
		name: "Liked Videos",
		icon: LuThumbsUp,
		activeIcon: IoMdThumbsUp,
		path: "/user/liked-videos",
	},
	{
		name: "Dashboard",
		icon: MdOutlineSpaceDashboard,
		activeIcon: MdSpaceDashboard,
		path: "/user/dashboard",
	},
];


