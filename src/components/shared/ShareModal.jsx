import React, { useState } from "react";
import {
	FacebookShareButton,
	TwitterShareButton,
	LinkedinShareButton,
	FacebookIcon,
	TwitterIcon,
	LinkedinIcon,
} from "react-share";

const ShareModal = ({ url, isOpen, onClose }) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
			<div className="p-6 bg-white rounded-lg shadow-lg">
				<h2 className="mb-4 text-lg font-bold">Share this page</h2>
				<div className="flex space-x-2">
					<FacebookShareButton url={url}>
						<FacebookIcon size={32} round />
					</FacebookShareButton>
					<TwitterShareButton url={url}>
						<TwitterIcon size={32} round />
					</TwitterShareButton>
					<LinkedinShareButton url={url}>
						<LinkedinIcon size={32} round />
					</LinkedinShareButton>
				</div>
				<button
					onClick={onClose}
					className="px-4 py-2 mt-4 text-white bg-red-500 rounded hover:bg-red-600"
				>
					Close
				</button>
			</div>
		</div>
	);
};

const ShareComponent = () => {
	const [isModalOpen, setModalOpen] = useState(false);
	const shareUrl = "https://example.com";

	const handleShare = async () => {
		if (navigator.share) {
			// Use Web Share API for mobile
			try {
				await navigator.share({
					title: "Check this out!",
					text: "Here is something interesting I found.",
					url: shareUrl,
				});
			} catch (error) {
				console.error("Error sharing content:", error);
			}
		} else {
			// Open custom modal for desktop
			setModalOpen(true);
		}
	};

	return (
		<div>
			<button
				onClick={handleShare}
				className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
			>
				Share
			</button>
			<ShareModal
				url={shareUrl}
				isOpen={isModalOpen}
				onClose={() => setModalOpen(false)}
			/>
		</div>
	);
};

export default ShareComponent;
