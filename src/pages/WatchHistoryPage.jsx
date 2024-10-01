import useWatchHistory from "../hooks/data/useWatchHistory";
import Loader from "../components/ui/loader/Loader";
import HistoryVideoItem from "../components/video/HistoryVideoItem";

const WatchHistoryPage = () => {
	const { watchHistoryData, watchHistoryError, watchHistoryLoading } =
		useWatchHistory();
	console.log(watchHistoryData);
	if (watchHistoryLoading || watchHistoryError) {
		return (
			<main className="grid size-full place-items-center">
				{watchHistoryLoading ? (
					<span className="size-[70px]">
						<Loader />
					</span>
				) : (
					<span className="text-xl text-muted">
						{watchHistoryError.message}
					</span>
				)}
			</main>
		);
	}
	const { data } = watchHistoryData;
	return (
		<main className="grid lg:grid-cols-[70%,1fr] size-full text-white grid-cols-1 grid-flow-row">
			<section className="flex flex-col h-full p-4 overflow-x-hidden overflow-y-auto scrollbar-hide">
				<h2 className="mb-8 text-2xl font-bold md:text-4xl">Watch History</h2>

				<div className="flex flex-col flex-1 h-auto gap-y-4">
					{data.length > 0 ? (
						data.map((item) => (
							<HistoryVideoItem key={item._id} item={item} />
						))
					) : (
						<div className="grid size-full place-items-center">
							<span className="text-xl text-muted">
								History not found
							</span>
						</div>
					)}
				</div>
			</section>
			<section className="hidden md:block"></section>
		</main>
	);
};

export default WatchHistoryPage;
