const RegistrationSuccessPopup = ({ show, onClose }) => {
	if (!show) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-opacity-75 backdrop-blur-sm">
			<div className="p-6 bg-white rounded-lg shadow-lg">
				<h2 className="mb-4 text-2xl font-bold text-center">
					Registration Successful
				</h2>
				<p className="mb-4 text-center">
					Thank you for your registration. Please verify your email to
					continue.
				</p>
				<button
					className="w-full px-4 py-2 font-bold text-white bg-black rounded-full hover:bg-opacity-100 focus:outline-none focus:shadow-outline bg-opacity-80 "
					onClick={onClose}
				>
					Close
				</button>
			</div>
		</div>
	);
};

export default RegistrationSuccessPopup;
