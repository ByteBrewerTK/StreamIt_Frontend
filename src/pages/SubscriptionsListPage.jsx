import Loader from "../components/ui/loader/Loader";
import useGetSubscriptions from "../hooks/data/useGetSubscriptions";
import { MdArrowBack } from "react-icons/md";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useOutletContext, Link } from "react-router-dom";
import { useEffect } from "react";

const SubscriptionsListPage = () => {
	const { setNavVisible } = useOutletContext();
	const { subscriptionData, subscriptionError, subscriptionLoading } =
		useGetSubscriptions();

	console.log(subscriptionData);

	useEffect(() => {
		setNavVisible(false);

		return () => {
			setNavVisible(true);
		};
	}, []);
	if (subscriptionLoading)
		return (
			<main className="grid flex-1 place-items-center ">
				<span className="size-[50px]">
					<Loader />
				</span>
			</main>
		);
	if (subscriptionError)
		return (
			<main className="grid flex-1 place-items-center">
				<span className="size-[50px]">{subscriptionError.message}</span>
			</main>
		);
	return (
		<main className="flex flex-col w-full overflow-hidden text-white">
			<header className="w-full py-2 bg-primary md:hidden">
				<nav className="flex items-center justify-between mx-auto w-container">
					<div className="flex items-center space-x-2">
						<span>
							<MdArrowBack className="text-xl" />
						</span>
						<h2 className="text-lg">All Subscriptions</h2>
					</div>
					<span>
						<FaMagnifyingGlass className="text-xl" />
					</span>
				</nav>
			</header>

			<div className="flex-1 p-4 overflow-x-hidden overflow-y-auto scrollbar-hide">
				<div className="space-y-2 size-full">
					{!subscriptionData ? (
						<div className="grid size-full place-content-center text-muted">
							No subscriptions found
						</div>
					) : (
						subscriptionData.map((channel) => (
							<Link
								to={`/user/${channel._id}`}
								key={channel._id}
								className="flex items-center space-x-2"
							>
								<div className="w-[40px] rounded-full overflow-hidden aspect-square">
									<img src={channel.avatar} alt="" />
								</div>
								<span>{channel.fullName}</span>
							</Link>
						))
					)}
				</div>
			</div>
		</main>
	);
};

export default SubscriptionsListPage;
