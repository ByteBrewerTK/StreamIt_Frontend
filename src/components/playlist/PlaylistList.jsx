const PlaylistList = ({ playlistData, selectedOption, setSelectedOption }) => {
	const handleSelection = (e) => {
		setSelectedOption(e.target.value);
	};

	return (
		<ul className="flex-1 overflow-x-hidden overflow-y-auto text-sm font-medium text-gray-900 bg-primary scrollbar-hide">
			{playlistData.data.length > 0 ? (
				playlistData.data.map((option) => (
					<li
						key={option._id}
						className="w-full border-b border-gray-700 rounded-t-lg"
					>
						<div className="flex items-center ps-3">
							<input
								id={option._id}
								type="radio"
								name="list-radio"
								value={option._id}
								onChange={handleSelection}
								checked={selectedOption === option._id}
								className="w-4 h-4 focus:ring-blue-500 dark:focus:ring-offset-gray-700 dark:bg-gray-600 dark:border-gray-500"
							/>
							<label
								htmlFor={option._id}
								className="w-full py-3 text-sm font-medium text-gray-900 ms-2 dark:text-gray-300"
							>
								{option.name}
							</label>
						</div>
					</li>
				))
			) : (
				<div className="grid h-20 place-items-center text-muted">
					<span>No playlist found</span>
				</div>
			)}
		</ul>
	);
};

export default PlaylistList;
