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

const ChannelPage = () => {
	const [isSubscribing, setSubscribing] = useState(false);
	const { setNavVisible } = useOutletContext();
	const { username } = useParams();
	const navigate = useNavigate();
	const { channelData, channelError, channelDataLoading } =
		useGetChannel(username);
	const isMyProfile = useIsMyProfile(username);
	console.log(isMyProfile);
	useEffect(() => {
		setNavVisible(false);
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
	// Loading and Error handling
	if (channelDataLoading) {
		return (
			<div className="grid w-full h-full place-items-center">
				<span className="size-[4rem]">
					<Loader />
				</span>
			</div>
		);
	}

	if (channelError) {
		return <div>Error loading user data.</div>;
	}

	if (!channelData) {
		return <div>No Data found</div>;
	}
	return (
		<section className="flex flex-col flex-1 overflow-hidden">
			<header className="bg-primary">
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
					<div className="mx-auto w-container">
						<div className="w-full aspect-[8/2]  overflow-hidden rounded-lg">
							<img
								src={channelData.coverImage}
								loading="lazy"
								alt=""
								className="object-cover object-center w-full h-full"
							/>
						</div>

						<div>
							<div className="flex items-center py-4 gap-x-2">
								<div className="size-[80px] overflow-hidden rounded-full">
									<img
										src={channelData.avatar}
										alt=""
										loading="lazy"
									/>
								</div>
								<div>
									<h2 className="font-bold">
										{channelData.fullName}
									</h2>
									<span className="text-smr text-muted_dark">
										@{channelData.username}
									</span>
									<div className="space-x-2 text-[0.75rem] text-muted_dark">
										<span>
											{formatCounts(
												channelData.subscribersCount,
												"subscribers"
											)}
										</span>

										<span>
											{channelData.totalVideos} Videos
										</span>
									</div>
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
