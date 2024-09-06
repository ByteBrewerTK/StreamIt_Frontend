const DeviceAccessDenied = () => {
	return (
		<div className="z-10 p-8 bg-red-100 rounded shadow-lg">
			<h1 className="text-xl font-bold text-red-600">Access Denied</h1>
			<p className="text-red-800">
				This page can only be accessed on a Mobile device.
			</p>
		</div>
	);
};

export default DeviceAccessDenied;
