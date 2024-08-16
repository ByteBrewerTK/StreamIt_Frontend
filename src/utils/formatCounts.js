export const formatCounts = (views) => {
	if (views >= 1_000_000_000) {
		return `${(views / 1_000_000_000).toFixed(1)}B views`; // Billion
	}
	if (views >= 1_000_000) {
		return `${(views / 1_000_000).toFixed(1)}M views`; // Million
	}
	if (views >= 1_000) {
		return `${(views / 1_000).toFixed(1)}K views`; // Thousand
	}
	return `${views} views`; // Less than thousand
};
