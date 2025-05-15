const AgeDetectionResult = ({ result }) => {
	if (!result) return null;

	return (
		<div className="p-4 mt-6 text-center bg-green-100 shadow rounded-xl">
			<p className="font-semibold text-black">Success</p>
		</div>
	);
};

export default AgeDetectionResult;
