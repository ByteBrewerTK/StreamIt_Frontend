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
		<main className="grid grid-cols-[70%,1fr] size-full text-white">
			<section className="h-full overflow-x-hidden overflow-y-auto border scrollbar-hide">
				<h2>Watch History</h2>

				<div>
					{data.map((item) => (
						<HistoryVideoItem key={item._id} item={item} />
					))}
				</div>
			</section>
			<section className="border border-red-500"></section>
		</main>
	);
};

export default WatchHistoryPage;
