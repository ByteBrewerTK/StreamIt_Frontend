import { Link } from "react-router-dom";
import Loader from "../components/ui/loader/Loader";
import useGetSubscriptions from "../hooks/data/useGetSubscriptions";
import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import useSubscriptionsVideos from "../hooks/data/useSubscriptionsVideos";
import VideoItem from "../components/video/VideoItem";

const SubscriptionsPage = () => {
	const { setNavVisible } = useOutletContext();
	const { subscriptionData, subscriptionError, subscriptionLoading } =
		useGetSubscriptions();
	const { subsVideosData, subsVideosError, isSubsVideosLoading } =
		useSubscriptionsVideos();

	useEffect(() => {
		setNavVisible(true);
	}, [setNavVisible]);

	if (subscriptionLoading)
		return (
			<main className="grid flex-1 place-items-center">
				<span className="size-[70px]">
					<Loader />
				</span>
			</main>
		);
	if (subscriptionError)
		return (
			<main className="grid flex-1 place-items-center text-muted">
				<span className="size-[50px] w-fit h-fit">
					{subscriptionError.message}
				</span>
			</main>
		);
	if (subscriptionData.length === 0)
		return (
			<main className="grid flex-1 place-items-center">
				<span className="size-[50px] text-muted w-fit h-fit">
					No subscriptions found
				</span>
			</main>
		);
	return (
		<main className="flex flex-col flex-1 overflow-hidden">
			<section className="flex py-2 bg-primary">
				<div className="flex flex-1 pl-2 overflow-x-auto overflow-y-hidden scrollbar-hide">
					{subscriptionData.map((channel) => (
						<div key={channel._id} className="w-[65px] m-1">
							<Link to={`/user/${channel.username}`}>
								<div className="size-[60px] rounded-full overflow-hidden">
									<img
										src={channel.avatar}
										alt=""
										loading="lazy"
										className="object-cover object-center "
									/>
								</div>
							</Link>
							<h3 className="w-full mt-1 text-white truncate text-smr">
								{channel.fullName}
							</h3>
						</div>
					))}
				</div>
				<Link
					to={"/user/subscriptions/list"}
					className="w-[40px] text-sm grid place-content-center text-blue-300"
				>
					All
				</Link>
			</section>
			<section className="overflow-x-hidden overflow-y-auto scrollbar-hide size-full">
				{isSubsVideosLoading || subsVideosError ? (
					<div className="grid size-full place-items-center">
						{subsVideosError && !isSubsVideosLoading ? (
							<span className="text-lg text-muted">
								{subsVideosError}
							</span>
						) : (
							<span className="size-[70px]">
								<Loader />
							</span>
						)}
					</div>
				) : (
					<section className="grid flex-1 h-full sm:h-screen gap-4 py-2 overflow-y-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[280px] md:auto-rows-[320px] bg-secondary text-white scrollbar-hide md:pb-8">
						{subsVideosData.map((video) => (
							<VideoItem key={video._id} element={video} />
						))}
					</section>
				)}
			</section>
		</main>
	);
};

export default SubscriptionsPage;
