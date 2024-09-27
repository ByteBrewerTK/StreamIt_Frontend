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
			<section className="h-full p-4 overflow-x-hidden overflow-y-auto scrollbar-hide">
				<h2 className="mb-8 text-4xl font-bold">Watch History</h2>

				<div className="md:space-y-4">
					{data.map((item) => (
						<HistoryVideoItem key={item._id} item={item} />
					))}
				</div>
			</section>
			<section></section>
		</main>
	);
};

export default WatchHistoryPage;
