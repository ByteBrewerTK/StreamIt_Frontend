import { useParams } from "react-router-dom";
import useGetChannel from "../../hooks/data/useGetChannel";
import { useOutletContext } from "react-router-dom";
import { useEffect } from "react";
import Loader from "../../components/ui/loader/Loader";
import { formatCounts } from "../../utils/formatCounts";
import { MdArrowBack } from "react-icons/md";
import ChannelVideos from "../../components/video/ChannelVideos";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toggleSubscription } from "../../services/api";
import useIsMyProfile from "../../hooks/useIsMyProfile";
import { Link } from "react-router-dom";

const ChannelPage = () => {
	const [isSubscribing, setSubscribing] = useState(false);
	const { setNavVisible } = useOutletContext();
	const { username } = useParams();
	const navigate = useNavigate();
	const updatedUsername = username.replace("@", "");
	const { channelData, channelError, channelDataLoading } =
		useGetChannel(updatedUsername);
	const isMyProfile = useIsMyProfile(updatedUsername);

	useEffect(() => {
		setNavVisible(true);
		return () => {
			setNavVisible(true);
		};
	});
	const subscriptionToggle = async () => {
		const updatedOwnerDetails = await toggleSubscription(
			isSubscribing,
			setSubscribing,
			channelData
		);
		channelData.isSubscribed = updatedOwnerDetails.isSubscribed;
		channelData.subscribersCount = updatedOwnerDetails.subscribersCount;
	};

	if (channelDataLoading) {
		return (
			<div className="grid w-full h-full place-items-center">
				<span className="size-[70px]">
					<Loader />
				</span>
			</div>
		);
	}

	if (channelError) {
		return <div>Error loading user data.</div>;
	}

	if (!channelData ) {
		return <div>No Channel found</div>;
	}
	return (
		<section className="flex flex-col flex-1 overflow-hidden">
			<header className="bg-primary md:hidden">
				<nav className="flex items-center py-2 mx-auto text-white w-container gap-x-2">
					<button
						onClick={() => {
							navigate(-1);
						}}
					>
						<MdArrowBack className="text-2xl" />
					</button>
					<span>{channelData.fullName}</span>
				</nav>
			</header>
			<main className="flex flex-col overflow-auto text-white size-full scrollbar-hide">
				<section className="w-full pb-4 bg-primary">
					<div className="mx-auto w-container md:w-full">
						{!isMyProfile && (
							<div className="w-full aspect-[8/2]  overflow-hidden rounded-lg">
								<img
									src={channelData.coverImage}
									loading="lazy"
									alt=""
									className="object-cover object-center w-full h-full"
								/>
							</div>
						)}

						<div>
							<div className="flex items-center py-4 gap-x-2">
								<div className="size-[80px] overflow-hidden rounded-full md:size-[160px]">
									<img
										src={channelData.avatar}
										alt=""
										loading="lazy"
									/>
								</div>
								<div className="flex flex-col gap-y-2">
									<h2 className="font-bold md:text-4xl">
										{channelData.fullName}
									</h2>
									<div className="md:flex gap-x-2">
										<span className="text-smr text-muted_dark md:text-base">
											@{channelData.username}
										</span>
										<div className="space-x-2 text-[0.75rem] text-muted_dark md:text-base">
											<span className="hidden md:inline-block">
												{" "}
												&bull;{" "}
											</span>
											<span>
												{formatCounts(
													channelData.subscribersCount,
													"subscribers"
												)}
											</span>

											<span className="hidden md:inline-block">
												{" "}
												&bull;{" "}
											</span>
											<span>
												{channelData.totalVideos} Videos
											</span>
										</div>
									</div>
									{isMyProfile && (
										<div className="flex flex-col gap-y-2 md:flex-row md:gap-x-2">
											<Link
												to={"/user/settings/account"}
												className="w-full px-4 py-1 text-center text-black bg-white rounded-full md:w-auto md:bg-transparent md:text-white md:bg-white md:bg-opacity-15"
											>
												Customize Channel
											</Link>
											<Link className="w-full px-4 py-1 text-center text-white border rounded-full md:w-auto md:bg-transparent md:text-white md:bg-white md:bg-opacity-15 md:border-transparent">
												Manage Videos
											</Link>
										</div>
									)}
								</div>
							</div>
							{!isMyProfile && (
								<button
									onClick={subscriptionToggle}
									className={`w-full h-8 text-black rounded-full flex justify-center items-center ${
										!(
											channelData.isSubscribed ||
											isSubscribing
										)
											? "bg-white"
											: "border bg-transparent text-white"
									}`}
								>
									{!isSubscribing ? (
										!channelData.isSubscribed ? (
											"Subscribe"
										) : (
											"Subscribed"
										)
									) : (
										<span className="size-[20px]">
											<Loader />
										</span>
									)}
								</button>
							)}
						</div>
					</div>
				</section>

				<section className="flex-1 ">
					<ChannelVideos username={channelData.username} />
				</section>
			</main>
		</section>
	);
};

export default ChannelPage;
