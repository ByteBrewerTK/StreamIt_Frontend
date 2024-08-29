const GeneralSettingsOptions = ({ icon, title, path }) => {
	console.log(title);
	const Icon = icon;
	return (
		<div className="flex items-center justify-between px-4 py-2 space-x-2 r hover:bg-white hover:bg-opacity-10 group">
			<div className="flex items-center space-x-2">
				<Icon className="text-xl" />
				<span>{title}</span>
			</div>

			<label className="relative inline-flex items-center cursor-pointer">
				<input id="switch" type="checkbox" className="sr-only peer" />
				<label htmlFor="switch" className="hidden"></label>
				<div className="peer h-5 w-8 rounded-full border bg-secondary after:absolute after:left-[4px] after:top-1 after:h-3 after:w-3 after:rounded-full after:border after:border-muted_border after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-muted_border peer-focus:ring-green-300"></div>
			</label>
		</div>
	);              
};

export default GeneralSettingsOptions;
