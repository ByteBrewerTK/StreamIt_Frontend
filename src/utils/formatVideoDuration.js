const formatVideoDuration = (seconds)=> {
	// Ensure input is a number and round it to the nearest second
	const totalSeconds = Math.floor(Number(seconds));

	// Calculate hours, minutes, and seconds
	const hours = Math.floor(totalSeconds / 3600);
	const minutes = Math.floor((totalSeconds % 3600) / 60);
	const remainingSeconds = totalSeconds % 60;

	// Format with leading zeros if necessary
	const formattedMinutes =
		hours > 0 ? String(minutes).padStart(2, "0") : minutes;
	const formattedSeconds = String(remainingSeconds).padStart(2, "0");

	// Return the formatted time string
	return hours > 0
		? `${hours}:${formattedMinutes}:${formattedSeconds}`
		: `${formattedMinutes}:${formattedSeconds}`;
}
export default formatVideoDuration;