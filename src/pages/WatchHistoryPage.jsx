import useWatchHistory from "../hooks/data/useWatchHistory";

const WatchHistoryPage = () => {
	const { watchHistoryData, watchHistoryError, watchHistoryLoading } =
		useWatchHistory();
    if(watchHistoryLoading){
        return <main>
            
        </main>
    }
	return (
		<main className="grid grid-cols-[70%,1fr] size-full text-white">
			<section className="h-full overflow-x-hidden overflow-y-auto border scrollbar-hide">
				<h2>Watch History</h2>

				<div>
                    
                </div>
			</section>
			<section></section>
		</main>
	);
};

export default WatchHistoryPage;
