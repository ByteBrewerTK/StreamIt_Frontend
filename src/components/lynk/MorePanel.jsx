import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import toast from "react-hot-toast";
import { apiRequest } from "../../services/api";

const MorePanel = ({ isMoreOptionsOpen, setMoreOptionsOpen, lynkId }) => {
	const closeMoreOptions = () => {
		setMoreOptionsOpen(false);
	};

	const handleShare = () => {
		navigator.clipboard.writeText(
			`${window.location.origin}/lynk/${lynkId}`
		);
		toast.success("Link copied to clipboard!");
		closeMoreOptions();
	};

	const handleReportLynk = async () => {
		try {
			await apiRequest(`/lynks/${lynkId}/report`, "POST");
			toast.success("Lynk reported successfully");
			closeMoreOptions();
		} catch (error) {
			console.error("Failed to report lynk", error);
			toast.error("Failed to report lynk");
		}
	};

	const handleDeleteLynk = async () => {
		try {
			await apiRequest(`/lynks/${lynkId}`, "DELETE");
			toast.success("Lynk deleted successfully");
			// You might want to update the UI or refetch the data
			window.location.reload();
			closeMoreOptions();
		} catch (error) {
			console.error("Failed to delete lynk", error);
			toast.error("Failed to delete lynk");
		}
	};

	return (
		<Transition appear show={isMoreOptionsOpen} as={Fragment}>
			<Dialog
				as="div"
				className="fixed inset-0 z-50 overflow-y-auto"
				onClose={closeMoreOptions}
			>
				<div className="min-h-screen px-4 text-center">
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30" />
					</Transition.Child>

					<span
						className="inline-block h-screen align-middle"
						aria-hidden="true"
					>
						&#8203;
					</span>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0 scale-95"
						enterTo="opacity-100 scale-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100 scale-100"
						leaveTo="opacity-0 scale-95"
					>
						<div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-[#1a1a1a] border border-gray-700 shadow-xl rounded-2xl">
							<Dialog.Title
								as="h3"
								className="text-lg font-medium leading-6 text-white"
							>
								Lynk Options
							</Dialog.Title>

							<div className="mt-4 space-y-2">
								<button
									className="flex items-center w-full p-3 text-white transition rounded-lg hover:bg-gray-700"
									onClick={handleShare}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="w-5 h-5 mr-3"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
										/>
									</svg>
									Share Lynk
								</button>

								<button
									className="flex items-center w-full p-3 text-white transition rounded-lg hover:bg-gray-700"
									onClick={handleReportLynk}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="w-5 h-5 mr-3"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
										/>
									</svg>
									Report Lynk
								</button>

								<button
									className="flex items-center w-full p-3 text-red-500 transition rounded-lg hover:bg-gray-700"
									onClick={handleDeleteLynk}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="w-5 h-5 mr-3"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
										/>
									</svg>
									Delete Lynk
								</button>
							</div>

							<div className="mt-6">
								<button
									type="button"
									className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-gray-700 border border-transparent rounded-lg hover:bg-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
									onClick={closeMoreOptions}
								>
									Cancel
								</button>
							</div>
						</div>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition>
	);
};

export default MorePanel;
