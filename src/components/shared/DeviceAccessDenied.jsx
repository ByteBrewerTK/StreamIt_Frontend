const DeviceAccessDenied = ({type = "Mobile"}) => {
	return (
		<main className="flex-1 p-4">
			<div className="z-10 w-full p-8 bg-red-100 rounded shadow-lg">
				<h1 className="text-xl font-bold text-red-600">
					Access Denied
				</h1>
				<p className="text-red-800">
					This page can only be accessed on a {type} device.
				</p>
			</div>
		</main>
	);
};

export default DeviceAccessDenied;
