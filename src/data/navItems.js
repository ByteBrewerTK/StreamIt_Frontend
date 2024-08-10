import { MdOutlineSubscriptions } from "react-icons/md";
import { GoHome } from "react-icons/go";
import { GrChannel } from "react-icons/gr";
import { RiPlayList2Fill } from "react-icons/ri";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { LuThumbsUp } from "react-icons/lu";
import { GrHistory } from "react-icons/gr";

export const sideNavItems = [
	{
		name: "Home",
		icon: GoHome,
		path: "/",
	},
	{
		name: "Subscriptions",
		icon:  MdOutlineSubscriptions,
		path: "/user/subscriptions",
	},
	{
		name: "Your Channel",
		icon:  GrChannel,
		path: "/user/channel",
	},
	{
		name: "History",
		icon:  GrHistory,
		path: "/user/history",
	},
	{
		name: "Playlist",
		icon:  RiPlayList2Fill,
		path: "/user/playlists",
	},
	{
		name: "Your Videos",
		icon:  MdOutlineVideoLibrary,
		path: "/user/videos",
	},
	{
		name: "Liked Videos",
		icon:  LuThumbsUp,
		path: "/user/liked-videos",
	},
];
