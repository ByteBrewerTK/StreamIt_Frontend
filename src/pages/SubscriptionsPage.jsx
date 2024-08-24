import { Link } from "react-router-dom";
import Loader from "../components/ui/loader/Loader";
import useGetSubscriptions from "../hooks/data/useGetSubscriptions";
import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

const SubscriptionsPage = () => {
	const { setNavVisible } = useOutletContext();
	const { subscriptionData, subscriptionError, subscriptionLoading } =
		useGetSubscriptions();

	useEffect(() => {
		setNavVisible(true);
	}, [setNavVisible]);

	if (subscriptionLoading)
		return (
			<main className="grid flex-1 place-items-center">
				<span className="size-[50px]">
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
	if (subscriptionData.length ===0)
		return (
			<main className="grid flex-1 place-items-center">
				<span className="size-[50px] text-muted w-fit h-fit">
					No subscriptions found
				</span>
			</main>
		);
	return (
		<main className="flex-1 overflow-hidden">
			<section className="flex py-2 bg-primary">
				<div className="flex flex-1 pl-2 overflow-x-auto overflow-y-hidden scrollbar-hide">
					{subscriptionData.map((channel) => (
						<div key={channel._id} className="w-[65px] m-1">
							<div className="size-[60px] rounded-full overflow-hidden">
								<img
									src={channel.avatar}
									alt=""
									loading="lazy"
									className="object-cover object-center "
								/>
							</div>
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
			<section className="overflow-x-hidden overflow-y-auto scrollbar-hide"></section>
		</main>
	);
};

export default SubscriptionsPage;
