export const formatCounts = (count, type = "views") => {
	if (count >= 1_000_000_000) {
		return `${(count / 1_000_000_000).toFixed(1)}B count`; // Billion
	}
	if (count >= 1_000_000) {
		return `${(count / 1_000_000).toFixed(1)}M count`; // Million
	}
	if (count >= 1_000) {
		return `${(count / 1_000).toFixed(1)}K count`; // Thousand
	}
	return `${count} ${type}`; // Less than thousand
};
