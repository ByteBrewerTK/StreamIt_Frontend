import { LuFileVideo } from "react-icons/lu";
import Loader from "./loader/Loader";

const ProgressBar = ({ uploadProgress }) => {
	return (
		<div className="h-fit grid place-items-center fixed z-[1000] top-[1rem] mx-auto left-[50%] translate-x-[-50%]">
			<div className="min-w-[20rem] h-[50px] border border-muted rounded-xl flex items-center justify-between p-2 bg-white">
				{uploadProgress === 100 ? (
					<div className="flex items-center justify-between gap-x-2 size-full">
						<div className="flex items-center gap-x-2">
							<LuFileVideo className="text-xl text-muted" />
							<span className="text-muted">Processing...</span>
						</div>
						<span className="size-[20px]">
							<Loader />
						</span>
					</div>
				) : (
					<>
						<div className="flex items-center w-full ">
							<LuFileVideo className="text-xl text-muted" />
							<div className="h-[5px] bg-muted_dark rounded-full relative overflow-hidden flex-1">
								<div
									className="absolute inset-0 h-full bg-black rounded-full"
									style={{ width: `${uploadProgress}%` }}
								/>
							</div>
						</div>
						<span className="text-sm text-muted w-[2.5rem] text-end ">
							{uploadProgress}%
						</span>
					</>
				)}
			</div>
		</div>
	);
};

export default ProgressBar;
