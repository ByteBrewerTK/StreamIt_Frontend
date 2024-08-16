import React from "react";

const FetchError = (error) => {
	return (
		<div className="grid w-full h-full place-items-center">
			<span className="text-center text-muted">{error}</span>
		</div>
	);
};

export default FetchError;
