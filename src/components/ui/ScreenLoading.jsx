import Loader from "./loader/Loader";

const ScreenLoading = () => {
	return (
		<main className="grid w-screen h-screen bg-black bg-opacity-65 place-items-center">
			<div className="flex flex-col items-center space-y-4 text-xl font-bold text-white">
				<span className="">Verifying...</span>
				<span className="w-[70px] aspect-square">
					<Loader />
				</span>
			</div>
		</main>
	);
};

export default ScreenLoading;
