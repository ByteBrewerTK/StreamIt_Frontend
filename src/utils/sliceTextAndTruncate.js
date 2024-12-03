export const sliceTextAndTruncate = (text, len = 15) => {
	if (!text) return "";
	const slicedText =
		text.slice(0, len).trim() + (text.length > len ? "..." : "");
	return slicedText;
};
